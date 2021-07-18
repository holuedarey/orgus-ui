import { Component, Input, OnInit } from '@angular/core';
import { LoadPointDto } from 'src/app/@core/dtos/load-point.dto';

@Component({
  selector: 'app-load-point-gis',
  templateUrl: './load-point-gis.component.html',
  styleUrls: ['./load-point-gis.component.scss']
})
export class LoadPointGisComponent implements OnInit {

  @Input() value!: string | number;
  @Input() rowData!: LoadPointDto;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.rowData)
  }

}
