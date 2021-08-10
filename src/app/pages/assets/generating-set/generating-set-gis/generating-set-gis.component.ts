import { GeneratingSetDto } from './../../../../@core/dtos/generating-set.dto';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-generating-set-gis',
  templateUrl: './generating-set-gis.component.html',
  styleUrls: ['./generating-set-gis.component.scss']
})
export class GeneratingSetGisComponent implements OnInit {

  @Input() value!: string | number;
  @Input() rowData!: GeneratingSetDto

  constructor() { }

  ngOnInit(): void {
    console.log(this.rowData);
  }

}
