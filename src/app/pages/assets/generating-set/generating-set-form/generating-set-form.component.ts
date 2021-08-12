import { PowerSourceService } from './../../../../@core/data-services/power-source.service';
import { PowerSourceDto } from 'src/app/@core/dtos/power-source.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { map } from 'rxjs/operators';
import { MeterService } from 'src/app/@core/data-services/meter.service';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { GeneratingSetResources } from './../generating-set-resources';
import { GeneratingSetDto } from './../../../../@core/dtos/generating-set.dto';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NbDialogRef } from '@nebular/theme';
import { isLatitude, isLongitude } from 'class-validator';
import { PostGeneratingSetDto } from 'src/app/@core/dtos/post-generating-set.dto';
import { UpdateGeneratingSetDto } from 'src/app/@core/dtos/update-generating-set.dto';

@Component({
  selector: 'app-generating-set-form',
  templateUrl: './generating-set-form.component.html',
  styleUrls: ['./generating-set-form.component.scss'],
  providers: [FormBuilder]
})
export class GeneratingSetFormComponent implements OnInit {

  @Input()
  isCreateRequest = true;

  @Input()
  generatingSetForUpdate!: GeneratingSetDto;

  errors: string[] = [];
  messages: string[] = [];
  submitted = false;

  generatingSetForm!: FormGroup;

  powersource$!: Observable<PowerSourceDto[]>;

  generatingSetResources = GeneratingSetResources;
  isLive = true;

  EnergySourceEnum = [
    ['Unknown', 0],
    ['IPP', 1],
    ['IE', 2],
    ['Generator', 3],
    ['Solar', 4],
    ['Disco', 5]
  ]

  constructor(
    public dialogRef: NbDialogRef<GeneratingSetFormComponent>,
    private formBuilder: FormBuilder,
    private generatingSetService: GeneratingSetsService,
    private meterService: MeterService,
    private powerSourceService: PowerSourceService
  ) {
    this.powersource$ = this.powerSourceService.getPowerSource().pipe(map(d => d.data?.itemList as PowerSourceDto[]));
  }

  ngOnInit(): void {
    this.initCreateForm();
    if (this.isCreateRequest) {
    } else {
      this.initUpdateForm();
      this.generatingSetForm.controls['name'].disable();
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  initCreateForm(): void {
    this.generatingSetForm = this.formBuilder.group({
      name: ['', Validators.required],
      meterId: [null, Validators.required],
      meterNumber: [null,
        [
          Validators.required
        ],
        this.validateMeterAvailability.bind(this)
      ],
      powerSourceId: [null, Validators.required],
      energySource: ['', Validators.required],
    });
  }

  validateLatitude(input: FormControl) {
    const value = input.value;
    const isValidlatitude = isLatitude(input.value);
    if (isValidlatitude) {
      return;
    } else {
      return {
        invalidLatitude: `"${value}" is not a valid latitude`
      }
    }
  }
  validateLongitude(input: FormControl) {
    const value = input.value;
    const isValidLongitude = isLongitude(input.value);
    if (isValidLongitude) {
      return;
    } else {
      return {
        invalidLongitude: `"${value}" is not a valid Longitude`
      }
    }
  }
  keyPressNumbersOnly(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
      && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  initUpdateForm(): void {
    this.generatingSetForm = this.formBuilder.group({
      name: [this.generatingSetForUpdate.name, Validators.required],
      meterId: [this.generatingSetForUpdate.meterId, Validators.required],
      meterNumber: [
        this.generatingSetForUpdate.meter,
        [
          Validators.required
        ],
        this.validateMeterAvailability.bind(this)
      ],
      powerSource: [this.generatingSetForUpdate.powerSource, Validators.required],
      powerSourceId: [this.generatingSetForUpdate.powerSourceId, Validators.required],
      energySource: [this.generatingSetForUpdate.energySource, Validators.required],
    });

  }

  validateMeterAvailability(input: FormControl) {
    const value = (input.value as string)?.trim();
    if (!value) {
      return of(undefined);
    }
    if (!this.isCreateRequest) {
      if (value === this.generatingSetForUpdate.meter) {
        this.generatingSetForm.get('meterId')?.setValue(this.generatingSetForUpdate.meterId);
        return of(undefined);
      }
    }
    return this.meterService.getUnassignedMeter(value)
      .pipe(
        map(m => {
          if (m.data) {
            this.generatingSetForm.get('meterId')?.setValue(m.data.id);
            return;
          } else {
            if (m.message?.includes(' not exist')) {
              return { meterUnavailable: `Meter ${value} does not exist` }
            }
            return { meterUnavailable: `Meter ${value} is already assigned to a generating set` }
          }
        })
      )
  }

  saveGeneratingSet(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postGeneratingSetDto: PostGeneratingSetDto = {
      name: (this.generatingSetForm.get('name')?.value as string).trim(),
      meterId: (this.generatingSetForm.get('meterId')?.value as string).trim(),
      powerSourceId: (this.generatingSetForm.get('powerSourceId')?.value as string).trim(),
      energySource: (this.generatingSetForm.get('energySource')?.value as number),
    }

    this.generatingSetService.postGeneratingSet(postGeneratingSetDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Generating set creation successful'];
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
          'An Error occured while creating generating set .',
        ];
      }
    );
  }

  updateGeneratingSet(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const updateGeneratingSet: UpdateGeneratingSetDto = {
      name: (this.generatingSetForm.get('name')?.value as string).trim(),
      energySource: (this.generatingSetForm.get('energySource')?.value as number),
      meterId: (this.generatingSetForm.get('meterId')?.value as string).trim(),
      powerSourceId: (this.generatingSetForm.get('powerSourceId')?.value as string).trim(),
      id: this.generatingSetForUpdate.id
    };

    this.generatingSetService.updateGeneratingSet(updateGeneratingSet).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Generating set update successful'];
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
          'An Error occured while updating Generating set.',
        ];
      }
    );
  }

}
