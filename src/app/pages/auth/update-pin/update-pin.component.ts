import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { SeoService } from 'src/app/@core/utils';

@Component({
  selector: 'app-update-pin',
  templateUrl: './update-pin.component.html',
  styleUrls: ['./update-pin.component.scss']
})
export class UpdatePinComponent implements OnInit {

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  pass: any = {};

  isPasswordHidden = true;

  constructor(
    protected service: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private seo: SeoService
  ) {
    this.redirectDelay = this.getConfigValue('forms.resetPassword.redirectDelay');
    this.showMessages = this.getConfigValue('forms.resetPassword.showMessages');
    this.strategy = this.getConfigValue('forms.resetPassword.strategy');
  }

  ngOnInit() {
    this.seo.setSeoData('Reset Pin', 'Update application password');
    this.sendResetToken()
  }


  sendResetToken(): void {
    this.errors = this.messages = [];
    // this.submitted = true;

    this.service.resetTokenPin().subscribe(
      (result) => {
        // this.submitted = false;
        if (result.status) {
          this.messages = ['Enter the Pin sent to your email'];
          this.cd.detectChanges();
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        // this.submitted = false;
        this.errors = [
          'An Error occured while changing your password'
        ];
      }
    );
  }

  updatePass(): void {
    this.errors = this.messages = [];
    this.submitted = true;

    this.service.updatePin(this.pass).subscribe(
      (result) => {
        console.log(result);
        
        this.submitted = false;
        if (result.status) {
          this.messages = ['Your Pin was Reset successfully'];
          setTimeout(() => {
            return this.router.navigateByUrl('/');
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
          'An Error occured while Reseting your Pin'
        ];
      }
    );
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
