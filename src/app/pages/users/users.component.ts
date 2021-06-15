import { Component, OnInit } from '@angular/core';
import { NbDialogService, } from '@nebular/theme';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { PermissionEnum } from 'src/app/@core/enums/permission.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';
import { RoleMap } from 'src/app/@core/maps/role.map';
import { SeoService } from 'src/app/@core/utils';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { PermissionService } from 'src/app/@core/utils/permission.service';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserStatusToggleComponent } from './user-table-components/user-status-toggle/user-status-toggle.component';
import { UsersResources } from './users-resources';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  usersResources = UsersResources;
  isLoadingData = true;

  users: UserDto[] = [];

  columns = {
    firstName: {
      title: 'First Name',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    lastName: {
      title: 'Last Name',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    email: {
      title: 'Email',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    phone: {
      title: 'Phone Nos',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    role: {
      title: 'Funtion',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      }
    },
    ssoRole: {
      title: 'Role',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: Array.from(RoleMap.entries()).map(x => ({ value: x[0], title: x[1] })),
        },
      },
      valuePrepareFunction: (d: string) => RoleMap.get(d)
    },
    client: {
      title: 'Client',
      filter: {
        type: 'custom',
        component: TableFilterComponent
      },
      hide: !this.permissionService.canAccessByResource(PermissionEnum.View, UsersResources.ViewClientColumn)
    },
    status: {
      title: 'Status',
      renderComponent: UserStatusToggleComponent,
      type: 'custom',
      filter: {
        type: 'list',
        config: {
          selectText: 'Select...',
          list: [
            { value: 'Active', title: 'Active' },
            { value: 'In Active', title: 'Inactive' },
          ],
        },
      },
      filterFunction: (x: string, y: string) => x.toLowerCase() === y.toLowerCase()
    },
  }

  constructor(
    private dialogService: NbDialogService,
    private seo: SeoService,
    public onlineStat: OnlineStatService,
    private userService: UserService,
    public permissionService: PermissionService,
  ) { }

  async handleCreateNewUserClick() {
    this.dialogService.open(UserFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: true },
      closeOnEsc: false
    })
      .onClose.toPromise();
  }

  async updateUser(user: any) {
    this.dialogService.open(UserFormComponent, {
      closeOnBackdropClick: false,
      context: { isCreateRequest: false, userForUpdate: (user.data as UserDto) },
      closeOnEsc: false
    })
      .onClose.toPromise();
  }

  ngOnInit() {
    this.seo.setSeoData('User Module', 'Manage application users');
    this.requestData();
  }

  requestData(data?: any) {
    this.isLoadingData = true;
    console.log(data)
    this.userService.getUsers(data)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.users = GetUniqueArray([...response.data?.itemList ?? []], [...this.users]);
          }
        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }



}
