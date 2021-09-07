import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { isMobile } from 'mobile-device-detect';
import { AnalyticsConfigFormComponent } from '../analytics-config-form/analytics-config-form.component';

@Component({
  selector: 'app-analytics-block',
  templateUrl: './analytics-block.component.html',
  styleUrls: ['./analytics-block.component.scss']
})
export class AnalyticsBlockComponent implements OnInit {

  isMobile = isMobile;
  //output data from date range
  // Outputs
  @Output()
  selectedDateRange: EventEmitter<any> = new EventEmitter();

  // For header Section
  @Input() title: string = "";
  @Input() btnData: any = {};

  //for STAT Session
  formControl = new FormControl(new Date());
  ngModelDate = new Date();
  @Input() isLoading: any;
  @Input() cardTitle: any;
  @Input() energyUsed: any;
  @Input() energyCost: any;
  @Input() assetType: any;
  @Input() locations: any;
  @Input() queryDate: any;

  @Input() tableTitle: string = '';
  @Input() tableData = <any>[];
  @Input() tableColums = <any>[];

  // title for the chart Data
  @Input() chartData: any;
  @Input() chartConfig: any;

  //chart Title Data
  @Input() ChartTitleOne: any
  @Input() ChartTitleTwo: any


  //check for button or Toggle
  @Input() isButton: any;

  //check if to display map instead of second chart
  @Input() isMap: any;

  locationData = <any>[];
  selectedItemLoadPoint: any = "";
  selectedItemLocation: any = "";


  constructor(
    private dialogService: NbDialogService,

  ) { }

  ngOnInit(): void {
    console.log('')
  }


  onEventStartEndRange(ev: any) {
    this.selectedDateRange.emit(ev)
  }

  async configureForm() {
    const config = await this.dialogService.open(AnalyticsConfigFormComponent, {
      closeOnBackdropClick: false,
      context: {  },
      hasScroll: true,
      closeOnEsc: false
    }).onClose.toPromise();
    if (config) {
    }
  }


}
