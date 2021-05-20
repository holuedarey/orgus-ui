import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NB_AUTH_OPTIONS, getDeepFromObject } from '@nebular/auth';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { UserAuthService } from 'src/app/@core/data-services/user-auth.service';


@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent {


  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  pass: any = {};

  constructor(
    protected service: UserAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  updatePass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.updatePassword(this.pass).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Your password was changed successfully'];
          setTimeout(() => {
            return this.router.navigateByUrl('/');
          }, this.redirectDelay);
          this.cd.detectChanges();
        } else {
          this.errors = [
            'An Error occured while changing your password',
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while changing your password',
          error.message as string
        ];
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
