import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-points',
  templateUrl: './load-points.component.html',
  styleUrls: ['./load-points.component.scss']
})
export class LoadPointsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Load point')
  }

}
