import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmail, isMobilePhone, isPhoneNumber, validate, Validator } from 'class-validator';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss'],
  providers: [FormBuilder]
})
export class CreateUsersComponent implements OnInit {

  submitted = false;
  createUserForm!: FormGroup

  constructor(
    public dialogRef: NbDialogRef<CreateUsersComponent>,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForms();
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  initForms(): void {
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        this.validateEmail.bind(this)
      ]],
      phoneNumber: [
        '', [
          Validators.required,
          this.validatePhoneNumber.bind(this)
        ]
      ],
      role: ['', Validators.required],
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
        email: `"${value}" is not a valid email`
      }
    }
  }

  saveUser(): void {
    console.log(this.createUserForm.value);
  }
}
