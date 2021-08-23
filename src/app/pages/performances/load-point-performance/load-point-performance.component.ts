import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SeoService } from 'src/app/@core/utils';
import { isMobile } from 'mobile-device-detect';

@Component({
  selector: 'app-load-point-performance',
  templateUrl: './load-point-performance.component.html',
  styleUrls: ['./load-point-performance.component.scss']
})
export class LoadPointPerformanceComponent implements OnInit {
  title = "Load Point Management"
  btnData = {
    title: "Manage Loadpoint",
    link: "manage-loadpoint"
  }
  loadpoints:any = [
    {
      value : "LOAD POINT"
    }
  ];
  loacations:any = [
    {
      value : "Ministry of Education"
    }
  ];
  selectedItemLoadPoint:any = this.loadpoints[0].value || "";
  selectedItemLocation:any = this.loacations[0].value;
  formControl = new FormControl(new Date());
  ngModelDate = new Date();

  chartConfig = {
    type: 'line',
    options: {
      responsive: true,
      plugins: {
        legend: {
          display:false,
          position: 'top',
        },
        title: {
          display: false,
          // text: 'Chart.js Line Chart'
        }
      }
    },
  };
  chartData:any = ['nothing'];

  constructor(private seo: SeoService) {   }

  ngOnInit(): void {
    if(isMobile){
      console.log("Mobile Detected !");
      
    }
    this.seo.setSeoData('Performance Management - [Load Point Performance]', 'Manage Performance pof Load Point');
  }

}
