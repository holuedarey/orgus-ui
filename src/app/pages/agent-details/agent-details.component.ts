import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from 'src/app/@core/data-services/agent.service';
import { PostAgentDetailsDto } from 'src/app/@core/dtos/post-agent-details.dto';
import { PostAgentOtpDto } from 'src/app/@core/dtos/post-agent-otp.dto';
import { PostAgentTokenDto } from 'src/app/@core/dtos/post-agent-token-resend.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { SeoService } from 'src/app/@core/utils/seo.service';
import { TokenService } from 'src/app/@core/utils/token.service';
import { AppResources, AppResourcesNavMap } from 'src/app/app-resources';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.scss']
})
export class AgentDetailsComponent implements OnInit, OnDestroy {

  constructor(private seo: SeoService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private tokenService: TokenService,
    private agentService: AgentService,) { }
  
  
  updetailsForm!: FormGroup;
  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userName: string = '';
  disableUserName = true;
  isPasswordHidden = true;
  loginUser:any;

  showMessages: any = {};

  ngOnInit(): void {
    this.initCreateForm();
    this.seo.setSeoData('Agent Onboarding', 'Landing Page');
    this.loginUser = this.tokenService.getPayload();
  }


  initCreateForm(): void {
    this.updetailsForm = this.formBuilder.group({
      bvn:['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address:['', Validators.required],
      businessName:['', Validators.required],
      officeAddress: ['', Validators.required],
      officeState: ['', Validators.required],
      officeLga: ['', Validators.required],
      gender: ['', Validators.required],
      nokFullName: ['', Validators.required],
      nokEmail: ['', Validators.required],
      nokPhone:['', Validators.required],
      guarantorsFullName:['', Validators.required],
      guarantorsProfession: ['', Validators.required],
      guarantorsEmail:['', Validators.required],
      guarantorsResidence: ['', Validators.required],
      guarantorsOffice: ['', Validators.required],
      guarantorsPhone: ['', Validators.required],
      guarantorsRelationship: ['', Validators.required],
    });
  }

  updateDetails(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    const emailAddress = localStorage.getItem('email') || '';
    if (!emailAddress) {
      //show dialog bix for email address
    }

    const dateFormatter = (date:string) =>new Date(date).toISOString().split('T')[0];

    const postAgenttDetailsDto: PostAgentDetailsDto = {
     
      bvn:(this.updetailsForm.get('bvn')?.value as string).trim(),
      dateOfBirth: dateFormatter(this.updetailsForm.get('dateOfBirth')?.value as string),
      address:(this.updetailsForm.get('address')?.value as string).trim(),
      businessName:(this.updetailsForm.get('businessName')?.value as string).trim(),
      officeAddress: (this.updetailsForm.get('officeAddress')?.value as string).trim(),
      officeState: (this.updetailsForm.get('officeState')?.value as string).trim(),
      officeLga: (this.updetailsForm.get('officeLga')?.value as string).trim(),
      gender: (this.updetailsForm.get('gender')?.value as string).trim().toLowerCase(),
      nokFullName: (this.updetailsForm.get('nokEmail')?.value as string).trim(),
      nokEmail: (this.updetailsForm.get('nokEmail')?.value as string).trim(),
      nokPhone:(this.updetailsForm.get('nokPhone')?.value as string).trim(),
      guarantorsFullName:(this.updetailsForm.get('guarantorsFullName')?.value as string).trim(),
      guarantorsProfession: (this.updetailsForm.get('guarantorsProfession')?.value as string).trim(),
      guarantorsEmail:(this.updetailsForm.get('guarantorsEmail')?.value as string).trim(),
      guarantorsResidence: (this.updetailsForm.get('guarantorsResidence')?.value as string).trim(),
      guarantorsOffice: (this.updetailsForm.get('guarantorsOffice')?.value as string).trim(),
      guarantorsPhone: (this.updetailsForm.get('guarantorsPhone')?.value as string).trim(),
      guarantorsRelationship: (this.updetailsForm.get('guarantorsRelationship')?.value as string).trim(),
    }

    console.log(postAgenttDetailsDto);
    return;

    this.agentService.postAgentDetails(postAgenttDetailsDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)

        if (result.status) {
          this.messages = [result.message || 'Agent Updated successful'];
          if(this.loginUser.documentsUpload == false){
            this._router.navigate(['/agent-documents'])
          }else{
            this._router.navigateByUrl(AppResourcesNavMap.get(AppResources.AppView)?.route as string)
          }
        
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

  ngOnDestroy(): void {

  }


}
