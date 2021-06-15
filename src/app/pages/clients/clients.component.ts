import { ClientDto } from 'src/app/@core/dtos/client.dto';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { UsersResources } from 'src/app/pages/users/users-resources';
import { Component, OnInit } from '@angular/core';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { UserStatusToggleComponent } from './user-table-components/user-status-toggle/user-status-toggle.component';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  isLoadingData = true;

  usersResources = UsersResources

  clients: ClientDto[] = [];
  
  columns = {
    businessName: {
      title: 'Business Name',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    address: {
      title: 'Address',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    userName: {
      title: 'User Name',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    city: {
      title: 'City',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    contactEmail: {
      title: 'Contact Email',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    contactPerson: {
      title: 'Contact Person',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    contactPhone: {
      title: 'Contact Phone',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    jobRole: {
      title: 'Role',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      },
    }
  }

  constructor(
    public onlineStat: OnlineStatService,
    private dialogService: NbDialogService,
    private clientServive: ClientService
  ) { }

  async handleCreateNewClientClick() {
    this.dialogService.open(ClientFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
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
          console.log(response)
          this.isLoadingData = false;
          if (response.status) {
            this.clients = GetUniqueArray([...this.clients, ...response.data?.itemList ?? []]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }
}
