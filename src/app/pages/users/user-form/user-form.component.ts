import { RoleDto } from './../../../@core/dtos/role.dto';
import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isEmail, isMobilePhone } from 'class-validator';
import { RoleService } from 'src/app/@core/data-services/role.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-users',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [FormBuilder]
})
export class UserFormComponent implements OnInit {
  errors = [];
  submitted = false;
  createUserForm!: FormGroup
  appRoles$: Observable<RoleDto[]>;

  constructor(
    private roleService: RoleService,
    public dialogRef: NbDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder
  ) {
    this.appRoles$ = this.roleService.getRoles().pipe(map(d => d.data as RoleDto[]));
  }

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
