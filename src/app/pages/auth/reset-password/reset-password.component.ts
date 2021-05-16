import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ResetPasswordDto } from 'src/app/@core/dtos/reset-password.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { AuthExtensionService } from 'src/app/@core/utils/auth-extension.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {


  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(
    protected service: AuthExtensionService,
    private cd: ChangeDetectorRef,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }


  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    const resetPasswordDto: ResetPasswordDto = {
      password: this.user.password,
      tokenGuid: this.route.snapshot.queryParams.token
    };

    this.service.resetPassword(resetPasswordDto).subscribe(
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
