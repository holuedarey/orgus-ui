import { ClientResources } from './client-resources';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { ClientDto } from 'src/app/@core/dtos/client.dto';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { UsersResources } from 'src/app/pages/users/users-resources';
import { Component, OnInit } from '@angular/core';
import { UserStatusToggleComponent } from './user-table-components/user-status-toggle/user-status-toggle.component';
import { NbDialogService } from '@nebular/theme';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  isLoadingData = true;

  clientResources = ClientResources

  clients: ClientDto[] = [];

  columns = {
    businessName: {
      title: 'Business Name',

    },
    address: {
      title: 'Address',

    },
    userName: {
      title: 'User Name',

    },
    city: {
      title: 'City',

    },
    contactEmail: {
      title: 'Contact Email',

    },
    contactPerson: {
      title: 'Contact Person',

    },
    contactPhone: {
      title: 'Contact Phone',

    },
    jobRole: {
      title: 'Role',
      hide: !this.permissionService.canAccessByResource(PermissionEnum.View, ClientResources.ViewClientColumn)
    }
  }

  constructor(
    public onlineStat: OnlineStatService,
    private dialogService: NbDialogService,
    private clientServive: ClientService,
    public permissionService: PermissionService,
  ) { }

  async handleCreateNewClientClick() {
    this.dialogService.open(ClientFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
      closeOnEsc: false
    })
      .onClose.toPromise();
  }
  async updateClient(client: any) {
    this.dialogService.open(ClientFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: false, clientForUpdate: (client.data as ClientDto) },
      closeOnEsc: false
    })
      .onClose.toPromise();
  }

  ngOnInit(): void {
    this.requestData();
  }
  requestData(data?: any) {
    this.isLoadingData = true;
    console.log(data)
    this.clientServive.getClients(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.clients = GetUniqueArray([...this.clients, ...response.data?.itemList ?? []], [...this.clients]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }
}
