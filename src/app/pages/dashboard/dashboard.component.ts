import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
  draggable = false;
  constructor() { }

}
