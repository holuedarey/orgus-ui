import { PowerSourceService } from './../../../../@core/data-services/power-source.service';
import { GenSetDialogComponent } from './../gen-set-dialog/gen-set-dialog.component';
import { PowerSourceDto } from 'src/app/@core/dtos/power-source.dto';
import { Component, OnInit, Input } from '@angular/core';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-gen-set-column',
  templateUrl: './gen-set-column.component.html',
  styleUrls: ['./gen-set-column.component.scss']
})
export class GenSetColumnComponent implements OnInit {
  @Input() rowData!: PowerSourceDto;

  isLoadingData = true;

  constructor(
    private dialogService: NbDialogService,
    private powerSourceService: PowerSourceService
  ) { }

  ngOnInit(): void {
    console.log('');
  }


  viewGenSetModal(id: any) {
    this.isLoadingData = true;
    this.powerSourceService.getPowerSourceGeneratingSet(id)
      .subscribe(
        (response) => {
          this.isLoadingData = false;
          if (response.status) {
            this.dialogService.open(GenSetDialogComponent, {
              closeOnBackdropClick: false,
              context: {
                powerSourceGenSet: (response.data)
              },
              hasScroll: true,
              closeOnEsc: false
            });
          };

        },
        (err) => {
          this.isLoadingData = false;
        }
      )
  }





}
