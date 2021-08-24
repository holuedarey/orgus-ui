import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generating-set-performance',
  templateUrl: './generating-set-performance.component.html',
  styleUrls: ['./generating-set-performance.component.scss']
})
export class GeneratingSetPerformanceComponent implements OnInit {

  title = "Generating Set Dashboard"
  btnData = {
    title: "Manage Generating Set",
    link: "manage-loadpoint"
  }
  chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: '#f90',
        fill:false
      }
    ]
  };
  chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
  };
  
  constructor() { }

  ngOnInit(): void {
    console.log('');
  }

}
