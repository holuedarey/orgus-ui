import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { PostClientDto } from './../../../@core/dtos/post-client.dto';
import { ClientService } from 'src/app/@core/data-services/client.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { isEmail, isMobilePhone } from 'class-validator';

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

  createClientForm!: FormGroup;

  constructor(
    public dialogRef: NbDialogRef<ClientFormComponent>,
    private formBuilder: FormBuilder,
    private cientService: ClientService
  ) { }

  ngOnInit(): void {
    this.initCreateForm();
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

  initCreateForm(): void {
    // const userModel: UserModel = JSON.parse(this.tokenService.getPayload().sub);
    this.createClientForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      userName: ['', Validators.required],
      city: ['', Validators.required],
      role: ['', Validators.required],
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

    console.log('clicked');
    const postClientDto: PostClientDto = {
      businessName: (this.createClientForm.get('businessName')?.value as string).trim(),
      address: (this.createClientForm.get('address')?.value as string).trim(),
      userName: (this.createClientForm.get('address')?.value as string).trim(),
      city: (this.createClientForm.get('address')?.value as string).trim(),
      contactEmail: (this.createClientForm.get('contactEmail')?.value as string).trim(),
      contactPerson: (this.createClientForm.get('contactPerson')?.value as string).trim(),
      jobRole: (this.createClientForm.get('role')?.value as string).trim(),
      contactPhone: (this.createClientForm.get('phoneNumber')?.value as string).trim(),
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
          // this.cd.detectChanges();
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

  updateClient(): void {
    console.log('Updatte User')
  }
}
