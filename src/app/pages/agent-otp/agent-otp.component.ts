import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbAuthJWTToken, NbTokenService } from '@nebular/auth';
import { AgentService } from 'src/app/@core/data-services/agent.service';
import { PostAgentOtpDto } from 'src/app/@core/dtos/post-agent-otp.dto';
import { PostAgentTokenDto } from 'src/app/@core/dtos/post-agent-token-resend.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { IndexedDbKey } from 'src/app/@core/enums/indexed-db-key.enum';
import { LocalStorageKey } from 'src/app/@core/enums/local-storage-key.enum';
import { JwtPayloadModel } from 'src/app/@core/models/jwt-payload-model';
import { DbService } from 'src/app/@core/utils/db.service';
import { SecureLocalStorageService } from 'src/app/@core/utils/secure-local-storage.service';
import { SeoService } from 'src/app/@core/utils/seo.service';
import { TokenService } from 'src/app/@core/utils/token.service';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';

@Component({
  selector: 'app-agent-otp',
  templateUrl: './agent-otp.component.html',
  styleUrls: ['./agent-otp.component.scss']
})
export class AgentOtpComponent implements OnInit, OnDestroy {

  constructor(private seo: SeoService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private tokenService: TokenService,
    private nbTokenService: NbTokenService,
    private ls: SecureLocalStorageService,
    private dbService: DbService,
    protected cd: ChangeDetectorRef,
    private agentService: AgentService,) { }
  agentOtpForm!: FormGroup;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userName: string = '';
  disableUserName = true;
  isPasswordHidden = true;


  showMessages: any = {};

  redirectDelay = 0;

  ngOnInit(): void {
    this.initCreateForm();
    this.seo.setSeoData('Agent Onboarding', 'Landing Page');
  }


  initCreateForm(): void {
    this.agentOtpForm = this.formBuilder.group({
      otp: ['', Validators.required],
      pin: ['', Validators.required],
      confirmPin: ['', Validators.required],
    });
  }

  verifyOtp(): void {
    console.log("sending------")
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    const emailAddress = localStorage.getItem('email') || '';
    if (!emailAddress) {
      //show dialog bix for email address
    }

    const postAgenttOtpDto: PostAgentOtpDto = {
      email: emailAddress,
      activationPin: (this.agentOtpForm.get('otp')?.value as string).trim(),
      transactionPin: (this.agentOtpForm.get('pin')?.value as string).trim(),
      transactionPin_confirmation: (this.agentOtpForm.get('confirmPin')?.value as string).trim(),
    }

    this.agentService.postVerifyEmail(postAgenttOtpDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = [result.message || 'Account Verify successful'];
          console.log("login ", result.token)
          this.nbTokenService.set(
            new NbAuthJWTToken(
              result.token,
              'email',
            )
          );
          console.log(result.token)
          this.ls.set(LocalStorageKey.REFRESH_TOKEN.toString(), result.token);
          this.validateUserCache();
          this._router.navigate(['agent-details'])
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: any) => {
        this.submitted = false;
        this.errors = [
          error.error.message || 'An Error occured while creating client.',
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

  resendOtp(): void {
    console.log("sending------")
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postAgenttTokenDto: PostAgentTokenDto = {
      email: localStorage.getItem('email'),
    }

    this.agentService.postResendEmail(postAgenttTokenDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)

        if (result.status) {
          this.messages = [result.message || "Verification code Resend"];
          this._router.navigate(['agent-otp'])
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

  ngOnDestroy(): void {

  }


}
