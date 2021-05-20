import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { AuthExtensionService } from 'src/app/@core/data-services/auth-extension.service';


@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss']
})
export class RequestPasswordComponent {

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};

  constructor(
    protected service: AuthExtensionService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router) {

    this.redirectDelay = this.getConfigValue('forms.requestPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.requestPassword.showMessages');
    this.strategy = this.getConfigValue('forms.requestPassword.strategy');
  }

  requestPass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.requestPassword(this.user).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Your email was submitted successfully'];
          this.cd.detectChanges();
        } else {
          this.errors = [
            'An Error occured while submitting your reset-password request',
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
