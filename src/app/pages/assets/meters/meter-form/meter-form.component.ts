import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { MeterDto } from 'src/app/@core/dtos/meter.dto';
import { MeterManufaturerDto } from 'src/app/@core/dtos/meter-manufacturer.dto';
import { MeterResources } from '../meter-resources';
import { Observable } from 'rxjs';
import { MeterService } from 'src/app/@core/data-services/meter.service';
import { map } from 'rxjs/operators';
import { PostMeterDto } from 'src/app/@core/dtos/post-meter.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { UpdateMeterDto } from 'src/app/@core/dtos/update-meter.dto';

@Component({
  selector: 'app-meter-form',
  templateUrl: './meter-form.component.html',
  styleUrls: ['./meter-form.component.scss'],
  providers: [FormBuilder]
})
export class MeterFormComponent implements OnInit {
  @Input()
  isCreateRequest = true;

  @Input()
  meterForUpdate!: MeterDto;

  errors: string[] = [];
  messages: string[] = [];
  submitted = false;

  meterForm!: FormGroup

  meterManufacturer$: Observable<MeterManufaturerDto[]>;

  meterResources = MeterResources;
  isLive = true;

  constructor(
    public dialogRef: NbDialogRef<MeterFormComponent>,
    private formBuilder: FormBuilder,
    private meterService: MeterService
  ) {
    this.meterManufacturer$ = this.meterService.getMeterManufacturer().pipe(map(d => d.data as MeterManufaturerDto[]));

  }

  ngOnInit(): void {
    this.initCreateForm();
    if (this.isCreateRequest) {
    } else {
      this.initUpdateForm();
    }
  }


  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  initCreateForm(): void {
    this.meterForm = this.formBuilder.group({
      number: ['', Validators.required],
      phaseCount: [null, Validators.required],
      meterManufacturerId: [null, Validators.required],
      meterModel: ['', Validators.required],
    });
  }

  initUpdateForm(): void {
    this.meterForm = this.formBuilder.group({
      number: [this.meterForUpdate.number, Validators.required],
      phaseCount: [this.meterForUpdate.phaseCount, Validators.required],
      meterManufacturerId: [this.meterForUpdate.meterManufacturerId, Validators.required],
      meterModel: [this.meterForUpdate.meterModel, Validators.required],
    });
  }

  saveMeter(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postMeterDto: PostMeterDto = {
      number: (this.meterForm.get('number')?.value as string).trim(),
      phaseCount: (this.meterForm.get('phaseCount')?.value as number),
      meterManufacturer: (this.meterForm.get('meterManufacturerId')?.value as number),
      meterModel: (this.meterForm.get('meterModel')?.value as string).trim(),
    }

    this.meterService.postMeter(postMeterDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Meter creation successful'];
          setTimeout(() => {
            this.dialogRef.close(result.data);
          }, 1200);
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while creating meter.',
        ];
      }
    );
  }

  updateMeter(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const updateMeterDto: UpdateMeterDto = {
      number: (this.meterForm.get('number')?.value as string).trim(),
      phaseCount: (this.meterForm.get('phaseCount')?.value as number),
      meterManufacturer: (this.meterForm.get('meterManufacturerId')?.value as number),
      meterModel: (this.meterForm.get('meterModel')?.value as string).trim(),
      id: this.meterForUpdate.id
    }

    this.meterService.updateMeter(updateMeterDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Meter update successful'];
          setTimeout(() => {
            this.dialogRef.close(result.data);
          }, 1200);
        } else {
          this.errors = [
            result.message as string
          ];
        }
      },
      (error: ResponseDto<string>) => {
        this.submitted = false;
        this.errors = [
          'An Error occured while updating meter.',
        ];
      }
    );
  }

}
