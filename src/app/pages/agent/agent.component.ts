import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmail, IsMobilePhone, isMobilePhone } from 'class-validator';
import { AgentService } from 'src/app/@core/data-services/agent.service';
import { PostAgentDto } from 'src/app/@core/dtos/post-agent.dto';
import { PostClientDto } from 'src/app/@core/dtos/post-client.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { SeoService } from 'src/app/@core/utils/seo.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit, OnDestroy {

  constructor(private seo: SeoService,
    private formBuilder: FormBuilder,
    private _router: Router,
    private agentService: AgentService,) { }
  agentForm!: FormGroup;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userName: string = '';
  disableUserName = true;
  isPasswordHidden = true;


  showMessages: any = {};

  ngOnInit(): void {
    this.initCreateForm();
    this.seo.setSeoData('Agent Onboarding', 'Landing Page');
  }


  initCreateForm(): void {
    this.agentForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      userName: ['', Validators.required],
      contactEmail: ['', [
        Validators.required,
        this.validateEmail.bind(this)
      ]],
      phoneNumber: [
        '', [
          Validators.required,
          this.validatePhoneNumber.bind(this)
        ]
      ],
    });
  }


  validatePhoneNumber(input: FormControl) {
    const value = input.value as string;
    const isValidPhoneNos = isMobilePhone(value.trim(), 'en-NG');
    if (isValidPhoneNos) {
      return;
    } else {
      return {
        phoneNos: `"${value}" is not a valid phone number`
      }
    }
  }

  validatePassword(input: FormControl) {
    const value = input.value as string;
    const isValidPhoneNos = isMobilePhone(value.trim(), 'en-NG');
    if (isValidPhoneNos) {
      return;
    } else {
      return {
        phoneNos: `"${value}" is not a valid phone number`
      }
    }
  }


  validateEmail(input: FormControl) {
    const value = (input.value as string).trim();
    const isValidEmail = isEmail(value);
    if (isValidEmail) {
      return;
    } else {
      return {
        contactEmail: `"${value}" is not a valid email`
      }
    }
  }

  saveClient(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postAgenttDto: PostAgentDto = {
      firstName: (this.agentForm.get('firstName')?.value as string).trim(),
      lastName: (this.agentForm.get('lastName')?.value as string).trim(),
      username: (this.agentForm.get('userName')?.value as string).trim(),
      email: (this.agentForm.get('contactEmail')?.value as string).trim(),
      password: (this.agentForm.get('password')?.value as string).trim(),
      password_confirmation: (this.agentForm.get('confirmPassword')?.value as string).trim(),
      phoneNumber: (this.agentForm.get('phoneNumber')?.value as string).trim(),
    }

    this.agentService.postAgent(postAgenttDto).subscribe(
      (result) => {
        this.submitted = false;
        console.log(result)

        if (result.status) {
          this.messages = ['Agent creation successful'];
          localStorage.setItem("email",(this.agentForm.get('contactEmail')?.value as string).trim())
          this._router.navigate(['agent-otp']);
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: any) => {
        this.submitted = false;
        this.errors = [
          error.error.message ||  'An Error occured while creating client.',
        ];
      }
    );
  }

  ngOnDestroy(): void {
    
  }

}
