import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { PostClientDto } from './../../../@core/dtos/post-client.dto';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { isEmail, isMobilePhone,MinLength, minLength, validate } from 'class-validator';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
  providers: [FormBuilder]
})
export class ClientFormComponent implements OnInit, OnDestroy {
  @Input()
  isCreateRequest = true;

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];
  userName: string = '';
  businessUnitNameAutofil: string = '';
  disableUserName = true;

  createClientForm!: FormGroup;
  createClientFormStepOne!: FormGroup;
  createClientFormStepTwo!: FormGroup;

  constructor(
    public dialogRef: NbDialogRef<ClientFormComponent>,
    private formBuilder: FormBuilder,
    private cientService: ClientService
  ) { }

  ngOnInit(): void {
    this.initCreateForm();
    this.updateUserName()

    // if (this.isCreateRequest) {
    // } else {
    //   this.initUpdateForm();
    // }
  }

  ngOnDestroy(): void {
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
  onFirstFormSubmit():void {
    console.log("onFirstFormSubmit");
  }
  initCreateForm(): void {
    // const userModel: UserModel = JSON.parse(this.tokenService.getPayload().sub);
    this.createClientFormStepOne = this.formBuilder.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
    });
    this.createClientFormStepTwo= this.formBuilder.group({
      role: [null, [Validators.required, Validators.min(3)]],       
      contactPerson: ['', Validators.required],
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

    const postClientDto: PostClientDto = {
      businessName: (this.createClientFormStepOne.get('businessName')?.value as string).trim(),
      address: (this.createClientFormStepOne.get('address')?.value as string).trim(),
      userName: (this.businessUnitNameAutofil).trim().toLowerCase().split(' ').join('.'),
      city: (this.createClientFormStepOne.get('city')?.value as string).trim(),
      contactEmail: (this.createClientFormStepTwo.get('contactEmail')?.value as string).trim(),
      contactPerson: (this.createClientFormStepTwo.get('contactPerson')?.value as string).trim(),
      jobRole: (this.createClientFormStepTwo.get('role')?.value as string).trim(),
      contactPhone: (this.createClientFormStepTwo.get('phoneNumber')?.value as string).trim(),
    }

    this.cientService.postClient(postClientDto).subscribe(
      (result) => {
        console.log(result);
        this.submitted = false;
        if (result.status) {
          this.messages = ['Client creation successful'];
          setTimeout(() => {
            this.dialogRef.close()
          }, 2000);
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
  updateUserName(): void {
    this.createClientFormStepOne.controls['userName'].disable();
    (this.createClientFormStepOne.get('userName')?.value as string).trim().toLowerCase().replace(' ','.')
    //this.businessUnitNameAutofil.trim()
  }
  updateClient(): void {
    console.log('Update User')
  }
}
