import { ClientService } from 'src/app/@core/data-services/client.service';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { SeoService } from './../../../@core/utils/seo.service';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { PowerSourceStatusToggleComponent } from './power-source-status-toggle/power-source-status-toggle.component';
import { PowerSourceGisComponent } from './power-source-gis/power-source-gis.component';
import { PowerSourceService } from './../../../@core/data-services/power-source.service';
import { Component, OnInit } from '@angular/core';
import { PowerSourceDto } from 'src/app/@core/dtos/power-source.dto';
import { PowerSourceResources } from './power-source-resources';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { TokenService } from 'src/app/@core/utils/token.service';

@Component({
  selector: 'app-power-sources',
  templateUrl: './power-sources.component.html',
  styleUrls: ['./power-sources.component.scss']
})
export class PowerSourcesComponent implements OnInit {


  isLoadingData = true;
  loadPointResources = PowerSourceService;

  powerSources: PowerSourceDto[] = [];

  columns = {
    name: {
      title: 'Name',
    },
    address:{
      title: 'Address',
    },
    state: {
      title: 'State',
    },
    lga: {
      title: 'LGA',
    },
    clientId: {
      title: 'Client',
      filter: {
        type: 'list',
        config: {
          selectText: 'Loading...',
          list: []
        },
      },
      valuePrepareFunction: (d: string, r: any) => {
        return r.client
      },
      hide: !this.permissionService.canAccessByResource(PermissionEnum.View, PowerSourceResources.ViewPowerSourceColumn)
    },
    gis: {
      title: 'GIS',
      renderComponent: PowerSourceGisComponent,
      type: 'custom',
      filter: false
    },
    status: {
      title: 'Status',
      renderComponent: PowerSourceStatusToggleComponent,
      type: 'custom',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 'Active', title: 'Active' },
            { value: 'InActive', title: 'Inactive' },
          ],
        },
      },
      filterFunction: (x: string, y: string) => x.toLowerCase() === y.toLowerCase()
    },
  }

  constructor(
    public permissionService: PermissionService,
    private dialogService: NbDialogService,
    private seo: SeoService,
    public onlineStat: OnlineStatService,
    private clientService: ClientService,
    private toastr: NbToastrService,
    private powerSourceService: PowerSourceService,
    private tokenService: TokenService,
  ) { }

  async handleCreateNewLoadPointClick() {
    const loadPoint = await this.dialogService.open(LoadPointFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
      hasScroll: true,
      closeOnEsc: false
    }).onClose.toPromise();
    if (loadPoint) {
      this.loadPoints = [loadPoint, ...this.loadPoints];
    }
  }

  ngOnInit(): void {
    this.seo.setSeoData('Asset Management - [Load Points]', 'Manage load Point assets');
    this.requestData();
    this.getClients();
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    this.loadPointService.getLoadPoints(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.loadPoints = GetUniqueArray([...response.data?.itemList ?? []], [...this.loadPoints]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }

  async updateLoadPoint({ data }: { data: LoadPointDto }) {
    const userModel: UserModel = JSON.parse(this.tokenService.getPayload().sub);
    const hasPermission = data.clientId === userModel.clientId;
    if (hasPermission) {
      const loadPoint: LoadPointDto = await this.dialogService.open(LoadPointFormComponent, {
        closeOnBackdropClick: false,
        context: { isCreateRequest: false, loadPointForUpdate: (data) },
        hasScroll: true,
        closeOnEsc: false
      }).onClose.toPromise();
      if (loadPoint) {
        this.loadPoints = GetUniqueArray([loadPoint], [...this.loadPoints], true);
      }
    } else {
      this.toastr.danger(
        'You do not have permission to update this loadPoint',
        'UNAUTHORISED',
        {
          position: NbGlobalPhysicalPosition.BOTTOM_RIGHT,
          preventDuplicates: true
        }
      );
    }
  }

  getClients() {
    this.clientService.getClients()
      .subscribe(
        (data) => {
          const clients = data.data?.itemList ?? [];
          const clientSearchFilterList = clients.map(r => ({ value: r.clientId, title: r.businessName }));
          this.columns.clientId.filter.config.selectText = 'Select...';
          this.columns.clientId.filter.config.list = clientSearchFilterList as any;
          this.columns = { ...this.columns }
        }
      )
  }


}
