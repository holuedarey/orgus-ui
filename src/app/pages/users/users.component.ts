import { Component, OnInit } from '@angular/core';
import { NbDialogService, } from '@nebular/theme';
import { SeoService } from 'src/app/@core/utils';
import { UserFormComponent } from './user-form/user-form.component';

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
    this.dialogService.open(UserFormComponent, { closeOnBackdropClick: false })
      .onClose.toPromise();
  }

  ngOnInit() {
    this.seo.setSeoData('User Module', 'Manage application users');
  }

}
