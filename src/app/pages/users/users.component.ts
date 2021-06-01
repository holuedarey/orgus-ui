import { Component, OnInit } from '@angular/core';
import { NbDialogService, } from '@nebular/theme';
import { SeoService } from 'src/app/@core/utils';
import { CreateUsersComponent } from './create-users/create-users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private dialogService: NbDialogService,
    private seo: SeoService
  ) { }

  async handleCreateNewUserClick() {
    this.dialogService.open(CreateUsersComponent, { closeOnBackdropClick: false })
      .onClose.toPromise();
  }

  ngOnInit() {
    this.seo.setSeoData('User Module', 'Manage application users');
  }

}
