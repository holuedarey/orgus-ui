import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { SeoService } from 'src/app/@core/utils';

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
  draggable = false;

  constructor(
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.setSeoData('Dashboard', 'Logged in user page analytics');
  }
  

}
