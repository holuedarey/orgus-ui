import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { ViewCell } from 'ng2-smart-table';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/@core/data-services/user.service';
import { UserDto } from 'src/app/@core/dtos/user.dto';
import { OnlineStatService } from 'src/app/@core/utils/online-stat.service';
import { ConfirmationDialogComponent } from 'src/app/@theme/components/confirmation-dialog/confirmation-dialog.component';
import { UsersResources } from '../../users-resources';

@Component({
  selector: 'app-user-status-toggle',
  templateUrl: './user-status-toggle.component.html',
  styleUrls: ['./user-status-toggle.component.scss']
})
export class UserStatusToggleComponent implements ViewCell, OnInit {

  checked = true;
  isSubmitted = false;

  renderValue!: string;
  renderStatus = 'primary';

  @Input() value!: string | number;
  @Input() rowData!: UserDto;

  usersResources = UsersResources;

  constructor(
    private dialogService: NbDialogService,
    public userService: UserService,
    public onlineStat: OnlineStatService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    public accessChecker: NbAccessChecker,
  ) { }

  ngOnInit(): void {
    this.checked = this.value === 'Active' ? true : false;
  }

  async onStatusChange(state: boolean) {
    this.isSubmitted = true;
    this.cd.detectChanges();
    console.log(state)
    const confirmed = await this.dialogService.open(
      ConfirmationDialogComponent,
      {
        context: {
          context: `Are you sure you wish to proceed?`,
          title: `${state ? 'Enable' : 'Disable'} User`
        },
      })
      .onClose.toPromise();

    if (confirmed) {
      of(state)
        .pipe(switchMap((state) => {
          if (state) {
            return this.userService.enableUser(this.rowData.id)
          }
          return this.userService.disableUser(this.rowData.id)
        }))
        .subscribe(
          (response) => {
            if (response.status) {
              this.isSubmitted = false;
              this.checked = state;
              this.cd.detectChanges();
            } else {
              this.errorResponse(state);
            }
          },
          (error) => {
            this.errorResponse(state);
          }
        )
    } else {
      this.errorResponse(state, false);
    }
  }

  errorResponse(state: boolean, showToaster = true) {
    this.isSubmitted = false;
    this.checked = !state;
    this.cd.detectChanges();
    if (showToaster) {
      this.toastr.danger('An error occured during the update', 'User Status', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT })
    }
  }
}