import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ResetPasswordDto } from 'src/app/@core/dtos/reset-password.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UpdatePasswordDto } from 'src/app/@core/dtos/update-password.dto';
import { AuthResources, AuthResourcesNavMap } from '../auth-resources';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';
  isPasswordHidden = true;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  isNewPassword: boolean;

  constructor(
    protected service: AuthService,
    private cd: ChangeDetectorRef,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
    this.isNewPassword = route.snapshot.data.isNewPassword;
  }


  resetPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    const resetPasswordDto: UpdatePasswordDto = {
      email: this.user.email||localStorage.getItem('email'),
      password: this.user.password,
      password_confirmation: this.user.confirmPassword,
      pin: this.user.otp
    };
    console.log("resetPasswordDto", resetPasswordDto)

    this.service.resetPassword(resetPasswordDto).subscribe(
      (result) => {
        console.log(result);
        
        this.submitted = false;
        if (result.status) {
          this.messages = ['Your password was changed successfully'];
          setTimeout(() => {
           this.router.navigate([AuthResourcesNavMap.get(AuthResources.LoginView)?.route]);

          }, this.redirectDelay);
          this.cd.detectChanges();
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while changing your password'
        ];
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
