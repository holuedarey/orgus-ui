import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-power-source-form',
  templateUrl: './power-source-form.component.html',
  styleUrls: ['./power-source-form.component.scss']
})
export class PowerSourceFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log('Power source form')
  }

}
