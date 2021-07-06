import { ConfirmationDialogComponent } from './../../../../@theme/components/confirmation-dialog/confirmation-dialog.component';
import { PermissionService } from './../../../../@core/utils/permission.service';
import { NbAccessChecker } from '@nebular/security';
import { OnlineStatService } from './../../../../@core/utils/online-stat.service';
import { MeterResources } from './../meter-resources';
import { MeterDto } from './../../../../@core/dtos/meter.dto';
import { ViewCell } from 'ng2-smart-table';
import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-meter-status-toggle',
  templateUrl: './meter-status-toggle.component.html',
  styleUrls: ['./meter-status-toggle.component.scss']
})
export class MeterStatusToggleComponent implements ViewCell, OnInit {
  checked = true;
  isSubmitted = false;

  renderValue!: string;
  renderStatus = 'primary';

  @Input() value!: string | number;
  @Input() rowData!: MeterDto;

  meterResources = MeterResources;
  canUpdateRow = false;

  constructor(
    private dialogService: NbDialogService,
    //public meterService: meterService,
    public onlineStat: OnlineStatService,
    private cd: ChangeDetectorRef,
    private toastr: NbToastrService,
    public accessChecker: NbAccessChecker,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.checked = this.value === 'Active' ? true : false;
    this.canUpdateRow = this.permissionService.canAccessByResource('update', 'meters:update-' + this.rowData.client.toLowerCase());
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

    // if (confirmed) {
    //   of(state)
    //     .pipe(switchMap((state) => {
    //       if (state) {
    //         return this.userService.enableUser(this.rowData.id)
    //       }
    //       return this.userService.disableUser(this.rowData.id)
    //     }))
    //     .subscribe(
    //       (response) => {
    //         if (response.status) {
    //           this.toastr.success('Status update successful', 'User Update', { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT })
    //           this.isSubmitted = false;
    //           this.checked = state;
    //           this.cd.detectChanges();
    //         } else {
    //           this.errorResponse(state, true, response.message);
    //         }
    //       },
    //       (error) => {
    //         this.errorResponse(state);
    //       }
    //     )
    // } else {
    //   this.errorResponse(state, false);
    // }
  }

  errorResponse(state: boolean, showToaster = true, message?: string) {
    this.isSubmitted = false;
    this.checked = !state;
    this.cd.detectChanges();
    if (showToaster) {
      this.toastr.danger(
        `${message ? message : 'An error occured during execution'}`,
        'User Update',
        { position: NbGlobalPhysicalPosition.BOTTOM_RIGHT, duration: 3000 }
      );
    }
  }
}
