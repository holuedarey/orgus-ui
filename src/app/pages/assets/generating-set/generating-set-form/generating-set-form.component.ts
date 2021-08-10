import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { map, takeWhile } from 'rxjs/operators';
import { LocationService } from 'src/app/@core/data-services/location.service';
import { MeterService } from 'src/app/@core/data-services/meter.service';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { LocationDto } from 'src/app/@core/dtos/location.dto';
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
  styleUrls: ['./generating-set-form.component.scss']
})
export class GeneratingSetFormComponent implements OnInit {

  @Input()
  isCreateRequest = true;

  @Input()
  generatingSetForUpdate!: GeneratingSetDto;

  errors: string[] = [];
  messages: string[] = [];
  submitted = false;

  generatingSetForm!: FormGroup

  generatingSetResources = GeneratingSetResources;
  isLive = true;

  countries$: Observable<LocationDto[]>
  states$: Observable<LocationDto[]>
  areas$: Observable<LocationDto[]>

  constructor(
    public dialogRef: NbDialogRef<GeneratingSetFormComponent>,
    private formBuilder: FormBuilder,
    private generatingSetService: GeneratingSetsService,
    private meterService: MeterService,
    private locationService: LocationService
  ) {
    this.countries$ = locationService.getCountries().pipe(map((r) => r.data as LocationDto[]));
    this.states$ = of([]);
    this.areas$ = of([]);
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
      latitude: ['', [
        Validators.required,
        this.validateLatitude.bind(this)]],
      longitude: ['', [
        Validators.required,
        this.validateLongitude.bind(this)]],
      address: ['', Validators.required],
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
      latitude: [this.generatingSetForUpdate.latitude, [
        Validators.required,
        this.validateLatitude.bind(this)]],
      longitude: [this.generatingSetForUpdate.longitude, [
        Validators.required,
        this.validateLongitude.bind(this)]],
      address: [this.generatingSetForUpdate.address, Validators.required],
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
            return { meterUnavailable: `Meter ${value} is already assigned to a loadpoint` }
          }
        })
      )
  }

  // trackRetrievedOptions() {
  //   this.generatingSetForm.get('countryId')?.valueChanges
  //     .pipe(takeWhile(() => this.isLive))
  //     .subscribe(
  //       (val) => {
  //         this.generatingSetForm.get('stateId')?.setValue(undefined);
  //         this.states$ = this.locationService.getStates({ countryId: val }).pipe(map((r) => r.data as LocationDto[]));
  //       }
  //     );
  //   this.generatingSetForm.get('stateId')?.valueChanges
  //     .pipe(takeWhile(() => this.isLive))
  //     .subscribe(
  //       (val) => {
  //         this.generatingSetForm.get('lgaId')?.setValue(undefined);
  //         this.areas$ = this.locationService.getAreas({ stateId: val }).pipe(map((r) => r.data as LocationDto[]));
  //       }
  //     );
  // }

  saveGeneratingSet(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postGeneratingSetDto: PostGeneratingSetDto = {
      name: (this.generatingSetForm.get('name')?.value as string).trim(),
      meterId: (this.generatingSetForm.get('meterId')?.value as number),
      powerSourceId: (this.generatingSetForm.get('meterId')?.value as number),
      latitude: (this.generatingSetForm.get('latitude')?.value as number),
      longitude: (this.generatingSetForm.get('longitude')?.value as number),
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
      meterId: (this.generatingSetForm.get('meterId')?.value as number),
      latitude: (this.generatingSetForm.get('latitude')?.value as number),
      longitude: (this.generatingSetForm.get('longitude')?.value as number),
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
