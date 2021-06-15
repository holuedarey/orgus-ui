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

  createClientForm!: FormGroup;

  constructor(
    public dialogRef: NbDialogRef<ClientFormComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // if (this.isCreateRequest) {
      //this.initCreateForm();
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

  // initCreateForm(): void {
  //  // const userModel: UserModel = JSON.parse(this.tokenService.getPayload().sub);
  //   this.createClientForm = this.formBuilder.group({
  //     businessName: ['', Validators.required],
  //     address: ['', Validators.required],
  //     userName: ['', Validators.required],
  //     city: ['', Validators.required],
  //     contactEmail: ['', [
  //       Validators.required,
  //       this.validateEmail.bind(this)
  //     ]],
  //     phoneNumber: [
  //       '', [
  //         Validators.required,
  //         this.validatePhoneNumber.bind(this)
  //       ]
  //     ],
  //     roleId: ['', Validators.required],
  //     ssoRole: [
  //       '', [
  //         Validators.required,
  //         this.validateSsoRole.bind(this)
  //       ]
  //     ],
  //     clientId: [
  //       this.permissionService.canAccessByResource('create', UsersResources.SetClient) ? '' : userModel.clientId
  //       , Validators.required
  //     ],
  //   });

  //   this.createUserForm.get('clientId')?.valueChanges
  //     .pipe(takeWhile(() => this.isLive))
  //     .subscribe(
  //       (v) => {
  //         this.createUserForm.get('email')?.updateValueAndValidity();
  //         this.createUserForm.get('ssoRole')?.updateValueAndValidity();
  //       }
  //     )
  // }
  // validateEmail(input: FormControl){
  //   const value = (input.value as string).trim();
  //   const isValidEmail = isEmail(value);
  //   if (!isValidEmail) {
  //     return {
  //       contactEmail: `"${value}" is not a valid email`
  //     }
  //   }
  // }
}
