import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbCalendarRange, NbDateService, NbDialogRef } from '@nebular/theme';
import { concat, forkJoin, merge, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GeneratingSetsService } from 'src/app/@core/data-services/generating-set.service';
import { LoadPointService } from 'src/app/@core/data-services/load-point.service';
import { PowerSourceService } from 'src/app/@core/data-services/power-source.service';
import { ListDto } from 'src/app/@core/dtos/list.dto';
import { ResponseDto } from 'src/app/@core/dtos/response-dto';
import { AssetTypeEnum } from 'src/app/@core/enums/asset-type.enum';
import { GetUniqueArray } from 'src/app/@core/functions/data-request.funtion';

@Component({
  selector: 'app-analytics-config-form',
  templateUrl: './analytics-config-form.component.html',
  styleUrls: ['./analytics-config-form.component.scss'],
  providers: [FormBuilder]
})
export class AnalyticsConfigFormComponent implements OnInit, OnDestroy {

  analyticsForm!: FormGroup;
  isLoading = false;

  range: NbCalendarRange<Date>;
  assetMap!: Map<AssetTypeEnum, any>;

  @Input()
  assetType!: AssetTypeEnum;

  @Input()
  isSummary!: boolean;


  get monthStart(): Date {
    return this.dateService.getMonthStart(new Date());
  }
  get monthEnd(): Date {
    return this.dateService.getMonthEnd(new Date());
  }

  filteredOptions$: Observable<any[]> = of([]);
  options: any[] = [];

  dataSource!: (data?: any) => Observable<ResponseDto<ListDto<any>>>;

  constructor(
    public dialogRef: NbDialogRef<AnalyticsConfigFormComponent>,
    private formBuilder: FormBuilder,
    protected dateService: NbDateService<Date>,
    private loadpointService: LoadPointService,
    private genSetService: GeneratingSetsService,
    private powerSourceService: PowerSourceService
  ) {
    this.range = {
      start: this.monthStart,
      end: this.monthEnd,
    };
  }

  ngOnInit(): void {
    this.analyticsForm = this.formBuilder.group({
      dateRange: [this.range, Validators.required],
      location: [''],
      locationId: ['', !this.isSummary ? Validators.required : undefined]
    })
    this.analyticsForm.get('dateRange')?.valueChanges.subscribe(console.log)
    this.analyticsForm.get('location')?.valueChanges.subscribe((data) => {
      this.filteredOptions$ = this.getFilteredOptions(data);
    })

    this.filteredOptions$ = this.callService();
  }

  getFilteredOptions(value: string) {
    console.log(this.options)
    return merge(
      of(this.options).pipe(
        map(arr => {
          console.log(arr)
          return arr.filter(d => (d.name.includes(value) || d.meter.includes(value)))
        })
      ),
      forkJoin([
        this.callService({ name: (value ?? '').toLowerCase() }),
        this.callService({ meterNumber: (value ?? '').toLowerCase() }),
      ]).pipe(map((data: any) => GetUniqueArray(data[0], data[1])))
    );
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close({
      date: this.analyticsForm.get('dateRange')?.value,
      locationId: this.analyticsForm.get('locationId')?.value,
      locationName: this.analyticsForm.get('location')?.value,
    });
  }

  onChange($event: any) {
    console.log($event)
    this.filteredOptions$ = this.getFilteredOptions($event);
  }

  onSelectionChange(option: any) {
    this.analyticsForm.get('locationId')?.setValue(option.id);
    this.analyticsForm.get('location')?.disable();
  }

  clearLocationSelection() {
    this.analyticsForm.get('locationId')?.setValue(undefined);
    this.analyticsForm.get('location')?.setValue('');
    this.analyticsForm.get('location')?.enable();

  }

  ngOnDestroy(): void {
    console.log('')
  }

  private callService(data?: any) {
    switch (this.assetType) {
      case AssetTypeEnum.LOADPOINT:
        return this.loadpointService.getLoadPoints(data).pipe(map(d => {
          const response = d.data?.itemList ?? [];
          this.options = GetUniqueArray(response, this.options)
          return response
        }));
      case AssetTypeEnum.GEN_SET:
        return this.genSetService.getGeneratingSets(data).pipe(map(d => {
          const response = d.data?.itemList ?? [];
          this.options = GetUniqueArray(response, this.options)
          return response
        }));
      case AssetTypeEnum.POWER_SOURCE:
        return this.powerSourceService.getPowerSource(data).pipe(map(d => {
          const response = d.data?.itemList ?? [];
          this.options = GetUniqueArray(response, this.options)
          return response
        }));
    }
  }

}