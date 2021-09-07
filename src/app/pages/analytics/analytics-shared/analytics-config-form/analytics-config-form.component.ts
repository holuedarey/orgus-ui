import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-analytics-config-form',
  templateUrl: './analytics-config-form.component.html',
  styleUrls: ['./analytics-config-form.component.scss'],
  providers: [FormBuilder]
})
export class AnalyticsConfigFormComponent implements OnInit, OnDestroy {

  analyticsForm!: FormGroup;

  isLoading = false;

  constructor(
    public dialogRef: NbDialogRef<AnalyticsConfigFormComponent>,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.analyticsForm = this.formBuilder.group({
      dateRange: [],
      locationId: ['']
    })
    this.analyticsForm.get('dateRange')?.valueChanges.subscribe(console.log)
  }

  close(): void {
    this.dialogRef.close(false);
  }
  
  confirm(): void {
    this.dialogRef.close(true);
  }
  
  ngOnDestroy(): void {
    console.log('')
  }

}
