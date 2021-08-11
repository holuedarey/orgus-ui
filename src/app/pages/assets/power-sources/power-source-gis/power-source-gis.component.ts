import { Component, OnInit, Input } from '@angular/core';
import { PowerSourceDto } from 'src/app/@core/dtos/power-source.dto';

@Component({
  selector: 'app-power-source-gis',
  templateUrl: './power-source-gis.component.html',
  styleUrls: ['./power-source-gis.component.scss']
})
export class PowerSourceGisComponent implements OnInit {
  @Input() value!: string | number;
  @Input() rowData!: PowerSourceDto;

  constructor() { }

  ngOnInit(): void {
    console.log(this.rowData)
  }

}
