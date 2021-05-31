import { Component, OnInit } from '@angular/core';
import { NbDialogService, } from '@nebular/theme';
import { CreateUsersComponent } from './create-users/create-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  constructor(
    private dialogService: NbDialogService,
  ) { }

  async handleCreateNewUserClick() {
    const create = await this.dialogService.open(CreateUsersComponent, { closeOnBackdropClick: false })
      .onClose.toPromise();
  }

}
