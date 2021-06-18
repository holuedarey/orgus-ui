import { ClientResources } from './client-resources';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { ClientDto } from 'src/app/@core/dtos/client.dto';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { ClientFormComponent } from './client-form/client-form.component';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

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
    this.clientServive.getClients(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.clients = GetUniqueArray([...response.data?.itemList ?? []], [...this.clients]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }
}
