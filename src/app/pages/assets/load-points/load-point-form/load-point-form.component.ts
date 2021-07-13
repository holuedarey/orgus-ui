import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { Observable, of } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { LoadPointService } from 'src/app/@core/data-services/load-point.service';
import { LocationService } from 'src/app/@core/data-services/location.service';
import { MeterService } from 'src/app/@core/data-services/meter.service';
import { LoadPointDto } from 'src/app/@core/dtos/load-point.dto';
import { LocationDto } from 'src/app/@core/dtos/location.dto';
import { PostLoadPointDto } from 'src/app/@core/dtos/post-load-point.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { UpdateLoadPointDto } from 'src/app/@core/dtos/update-load-point.dto';
import { LoadPointResources } from '../load-point-resources';

@Component({
  selector: 'app-load-point-form',
  templateUrl: './load-point-form.component.html',
  styleUrls: ['./load-point-form.component.scss'],
  providers: [FormBuilder]
})
export class LoadPointFormComponent implements OnInit {

  @Input()
  isCreateRequest = true;

  @Input()
  loadPointForUpdate!: LoadPointDto;

  errors: string[] = [];
  messages: string[] = [];
  submitted = false;

  loadPointForm!: FormGroup

  loadPointResources = LoadPointResources;
  isLive = true;

  countries$: Observable<LocationDto[]>
  states$: Observable<LocationDto[]>
  areas$: Observable<LocationDto[]>

  constructor(
    public dialogRef: NbDialogRef<LoadPointFormComponent>,
    private formBuilder: FormBuilder,
    private loadPointService: LoadPointService,
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
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

  initCreateForm(): void {
    this.loadPointForm = this.formBuilder.group({
      name: ['', Validators.required],
      countryId: [null, Validators.required],
      stateId: [null, Validators.required],
      areaId: [null, Validators.required],
      meterId: [null, Validators.required],
      meterNumber: [null, Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });

    this.trackRetrievedOptions();
  }

  initUpdateForm(): void {
    this.loadPointForm = this.formBuilder.group({
      name: [this.loadPointForUpdate.name, Validators.required],
      locationId: [this.loadPointForUpdate.locationId, Validators.required],
      meterId: [this.loadPointForUpdate.meterId, Validators.required],
      latitude: [this.loadPointForUpdate.latitude, Validators.required],
      longitude: [this.loadPointForUpdate.longitude, Validators.required],
    });
  }

  trackRetrievedOptions() {
    this.loadPointForm.get('countryId')?.valueChanges
      .pipe(takeWhile(() => this.isLive))
      .subscribe(
        (val) => {
          this.loadPointForm.get('stateId')?.setValue(undefined);
          this.states$ = this.locationService.getStates({ countryId: val }).pipe(map((r) => r.data as LocationDto[]));
        }
      );
    this.loadPointForm.get('stateId')?.valueChanges
      .pipe(takeWhile(() => this.isLive))
      .subscribe(
        (val) => {
          this.loadPointForm.get('areaId')?.setValue(undefined);
          this.areas$ = this.locationService.getAreas({ stateId: val }).pipe(map((r) => r.data as LocationDto[]));
        }
      );
  }

  saveLoadPoint(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const postLoadPointDto: PostLoadPointDto = {
      name: (this.loadPointForm.get('name')?.value as string).trim(),
      locationId: (this.loadPointForm.get('locationId')?.value as string).trim(),
      meterId: (this.loadPointForm.get('meterId')?.value as string).trim(),
      latitude: (this.loadPointForm.get('latitude')?.value as number),
      longitude: (this.loadPointForm.get('longitude')?.value as number),
    }

    this.loadPointService.postLoadPoint(postLoadPointDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['LoadPoint creation successful'];
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
          'An Error occured while creating load point.',
        ];
      }
    );
  }

  updateLoadPoint(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    const updateLoadPointDto: UpdateLoadPointDto = {
      name: (this.loadPointForm.get('name')?.value as string).trim(),
      locationId: (this.loadPointForm.get('locationId')?.value as string).trim(),
      meterId: (this.loadPointForm.get('meterId')?.value as string).trim(),
      latitude: (this.loadPointForm.get('latitude')?.value as number),
      longitude: (this.loadPointForm.get('longitude')?.value as number),
      id: this.loadPointForUpdate.id
    }

    this.loadPointService.postLoadPoint(updateLoadPointDto).subscribe(
      (result) => {
        this.submitted = false;
        if (result.status) {
          this.messages = ['Load Point update successful'];
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
          'An Error occured while updating load point.',
        ];
      }
    );
  }

}
