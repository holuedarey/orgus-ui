import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';
import { TableFilterComponent } from 'src/app/@tables/table-filter/table-filter.component';
import { TableTagComponent } from 'src/app/@tables/table-tag/table-tag.component';
import { TableService } from 'src/app/@tables/table.service';
// import * as XlsxPopulate from 'xlsx-populate/browser/xlsx-populate';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items = [
    'chart-i',
    'chart-ii',
    'chart-ii',
    'chart-i',
    'chart-ii',
    'chart-i',
    'chart-i',
    'chart-ii',
    'chart-i',
  ];

  draggable = true;

  constructor(
    private seo: SeoService,
    private tableService: TableService,
    // private xlsx: XlsxService
  ) { }

  requestData(d: any) {
    console.log(d)
  }


  async ngOnInit() {
    this.seo.setSeoData('Dashboard', 'Logged in user page analytics');
    this.testXlsx();
  }
  async testXlsx() {
    const data = [
      [7000, 'Hello'],
      [7000, 'I did this from Javascript'],
      [7000, 'WEB WORKER!!!'],
    ];
    // this.xlsx.generateReport(XlsxTemplateEnum.BasicReport, data, 'Something.xlsx');
  }



}
