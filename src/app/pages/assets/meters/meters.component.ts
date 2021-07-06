import { MeterFormComponent } from './meter-form/meter-form.component';
import { MeterResources } from './meter-resources';
import { PermissionService } from './../../../@core/utils/permission.service';
import { MeterDto } from './../../../@core/dtos/meter.dto';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { MeterStatusToggleComponent } from './meter-status-toggle/meter-status-toggle.component';

@Component({
  selector: 'app-meters',
  templateUrl: './meters.component.html',
  styleUrls: ['./meters.component.scss']
})
export class MetersComponent implements OnInit {
  isLoadingData = true;
  meterResources = MeterResources;

  meters: MeterDto[] = [];

  columns = {
    meterNumber: {
      title: 'Meter Number',
    },
    meterModel: {
      title: 'Model',
    },
    meterManufacturer: {
      title: 'Manufacturer',
    },
    address: {
      title: 'Address',
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
      hide: !this.permissionService.canAccessByResource(PermissionEnum.View, MeterResources.ViewMeterColumn)
    },
    status: {
      title: 'Status',
      renderComponent: MeterStatusToggleComponent,
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
  ) { }

  async handleCreateNewMeterClick() {
    const meter = await this.dialogService.open(MeterFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
      hasScroll: true,
      closeOnEsc: false
    }).onClose.toPromise();
    if (meter) {
      this.meters = [meter, ...this.meters];
    }
  }

  ngOnInit(): void {
    console.log('yeah')
  }

}
