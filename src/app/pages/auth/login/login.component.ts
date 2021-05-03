import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthJWTToken, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { LoginDto } from 'src/app/shared/@core/dtos/login.dto';
import { ResponseDto } from 'src/app/shared/@core/dtos/response-dto';
import { IndexedDbKey } from 'src/app/shared/@core/enums/indexed-db-key.enum';
import { LocalStorageKey } from 'src/app/shared/@core/enums/local-storage-key.enum';
import { AuthExtensionService } from 'src/app/shared/@core/utils/auth-extension.service';
import { DbService } from 'src/app/shared/@core/utils/db.service';
import { SecureLocalStorageService } from 'src/app/shared/@core/utils/secure-local-storage.service';
import { TokenService } from 'src/app/shared/@core/utils/token.service';
import { JwtPayloadModel } from 'src/app/shared/classes/models/jwt-payload-model';


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
    protected service: AuthExtensionService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private titleSvc: Title,
    private metaSvc: Meta,
    private dbService: DbService,
    private tokenService: TokenService,
    private nbTokenService: NbTokenService,
    private ls: SecureLocalStorageService
  ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  ngOnInit(): void {
    this.setSeoData();
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const loginDto: LoginDto = { email: this.user.email, password: this.user.password };

    this.service.authenticate(loginDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Login successful'];
          this.nbTokenService.set(
            new NbAuthJWTToken(
              result.data.jwt,
              'email',
            )
          );
          this.ls.set(LocalStorageKey.REFRESH_TOKEN.toString(), result.data.refreshToken);
          this.validateUserCache();
          setTimeout(() => {
            return this.router.navigateByUrl('/app');
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
          'An Error occured while logging you in.',
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

  private setSeoData(): void {
    this.titleSvc.setTitle('Argus Login');
    this.metaSvc.updateTag({
      name: 'description',
      content: 'Login into the Argus Application'
    });
  }
}
