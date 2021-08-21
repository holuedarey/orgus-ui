import { Component, OnInit } from '@angular/core';
import { SeoService } from 'src/app/@core/utils';
import { LoadPointManagementManagementResources } from './load-point-management-resources';

@Component({
  selector: 'app-load-point-managements',
  templateUrl: './load-point-managements.component.html',
  styleUrls: ['./load-point-managements.component.scss']
})
export class LoadPointManagementsComponent implements OnInit {

  isLoadingData = true;
  loadPointManagementResources = LoadPointManagementManagementResources;

  columns = {
    SN: {
      title: 'S/N',
    },
    Location: {
      title: 'Location',
    },
    FROM: {
      title: 'FROM',
    },
    TO: {
      title: 'TO',
    },
    ENERGYCONSUMPTION: {
      title: 'ENERGY CONSUMPTION',
    },
    ENERGYCOST: {
      title: 'ENERGY COST',
    },
  }

  
  constructor(
    private seo: SeoService,
  ) { }

  ngOnInit(): void {
    this.seo.setSeoData('Asset Management - [Load Point Managements]', 'Manage load Point assets');
  }

}
