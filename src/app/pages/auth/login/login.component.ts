import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthJWTToken, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AgentService } from 'src/app/@core/data-services/agent.service';
import { AuthService } from 'src/app/@core/data-services/auth.service';
import { LoginDto } from 'src/app/@core/dtos/login.dto';
import { PostAgentTokenDto } from 'src/app/@core/dtos/post-agent-token-resend.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { IndexedDbKey } from 'src/app/@core/enums/indexed-db-key.enum';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { SeoService } from 'src/app/@core/utils';
import { DbService } from 'src/app/@core/utils/db.service';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
import { TokenService } from 'src/app/@core/utils/token.service';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isPasswordHidden = true;

  redirectDelay = 0;
  showMessages: any = {};
  strategy = '';

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  rememberMe = true;

  constructor(
    protected service: AuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private dbService: DbService,
    private tokenService: TokenService,
    private nbTokenService: NbTokenService,
    private ls: SecureLocalStorageService,
    private agentService:AgentService,
    private seo: SeoService
  ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  ngOnInit(): void {
    this.seo.setSeoData('Login', 'Login into the Argus Application');
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const loginDto: LoginDto = { login: this.user.email, password: this.user.password };

    this.service.authenticate(loginDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Login successful'];
          this.nbTokenService.set(
            new NbAuthJWTToken(
              result.token,
              'email',
            )
          );
          this.ls.set(LocalStorageKey.REFRESH_TOKEN.toString(), result.token);
          this.validateUserCache();
          if(result.message === 'Your Email has not Been Verified'){
            console.log("got here to the errpr")
            this.resendOtp();
          }else{
            setTimeout(() => {
              return this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AppView)?.route as string);
            }, this.redirectDelay);
            // return this.router.navigateByUrl(AppResourcesNavMap.get(AppResources.AgentOtpView)?.route as string);
          }
         
          this.cd.detectChanges();
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error:any) => {
        this.submitted = false;
        if(error.error.message === 'Your Email has not Been Verified'){
          this.resendOtp();
        }
        this.errors = [
          'An Error occured while logging you in.',
        ];
      }
    );
  }

  resendOtp(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postAgenttTokenDto: PostAgentTokenDto = {
      email: "holudare2076@gmail.com".trim(),
    }

    this.agentService.postResendEmail(postAgenttTokenDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)

        if (result.status) {
          this.messages = [result.message || "Check your inbox for verification Code"];
          this.router.navigate(['agent-otp'])
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: any) => {
        this.submitted = false;
        console.log(error.error.errors)
        this.errors = [
          error.error.errors.email || 'An Error occured while creating client.',
        ];
      }
    );
  }

  private async validateUserCache(): Promise<void> {
    const loginInUser = this.tokenService.getPayload();
    const cachedUser = await this.dbService.dbGet<JwtPayloadModel>(IndexedDbKey.USER);

    if (!cachedUser) {
      await this.dbService.dbClear();
      return await this.dbService.dbSet<JwtPayloadModel>(IndexedDbKey.USER, loginInUser);
    } else {
      if (cachedUser?.sub !== loginInUser.sub) {
        await this.dbService.dbClear();
        return await this.dbService.dbSet<JwtPayloadModel>(IndexedDbKey.USER, loginInUser);
      }
    }
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
