import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss'],
  providers: [FormBuilder]
})
export class MeterFormComponent implements OnInit {
  @Input()
  isCreateRequest = true;

  submitted = false;

  meterForm!: FormGroup

  constructor(
    public dialogRef: NbDialogRef<MeterFormComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initCreateForm();
    // if (this.isCreateRequest) {
    // } else {
    //   this.initUpdateForm();
    // }
  }
  

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  initCreateForm(): void {
    this.meterForm = this.formBuilder.group({
      meterNumber: ['', Validators.required],
      meterModel: ['', Validators.required],
      meterManufacturer: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  saveMeter(): void {
    console.log('save');
  }

  updateMeter(): void {
    console.log('update');
  }

}
