import { PowerSourceDto } from 'src/app/@core/dtos/power-source.dto';
import { NbDialogRef } from '@nebular/theme';
import { Component, OnInit, Input} from '@angular/core';
import { PowerSourceGenSetDto } from 'src/app/@core/dtos/gen-set-details.dto';

@Component({
  selector: 'app-gen-set-dialog',
  templateUrl: './gen-set-dialog.component.html',
  styleUrls: ['./gen-set-dialog.component.scss']
})
export class GenSetDialogComponent implements OnInit {
  @Input() powerSourceGenSet!: PowerSourceDto[];

  columns = {
    name: {
      title: 'Name',
      filter: false
    },
    meter:{
      title: 'Meter Number',
      filter: false
    },
    energySourceName: {
      title: 'Energy Source',
      filter: false
    },
  }

  constructor(
    public dialogRef: NbDialogRef<GenSetDialogComponent>,
  ) {}

  ngOnInit(): void {
    console.log(this.powerSourceGenSet);
    
  }

  close(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }

}
