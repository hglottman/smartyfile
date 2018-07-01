import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { AllFilesComponent } from '../all-files/all-files.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-file-unit',
  templateUrl: './file-unit.component.html',
  styleUrls: ['./file-unit.component.css']
})
export class FileUnitComponent implements OnInit {

  @Input() file: File = new File();
  @Output() parentDelete: EventEmitter<File> = new EventEmitter();



  constructor(private dialog: MatDialog) { }

  ngOnInit( ) {

  }

  colorFile() {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // a and b are javascript Date objects
    function dateDiffInDays(a, b) {
      // Discard the time and time-zone information.
      const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
      const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
      return Math.floor((utc2 - utc1) / MS_PER_DAY);
    }

    const d1: Date = new Date();
    const d2: Date = new Date(this.file.end_date);
    const difference = dateDiffInDays(d1, d2);
    console.log(difference);

    function cellColorF(dayDifference) {
      if (0 < dayDifference && dayDifference < 15) {
        return 'red';
      } else if (14 < dayDifference && dayDifference < 31) {
        return 'yellow';
      } else if (dayDifference > 30) {
        return 'green';
      } else {
        return 'white';
      }
    }

      return  cellColorF(difference);

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.file;
    this.dialog.open(DialogComponent, dialogConfig);
}

deleteFile () {
  this.parentDelete.emit(this.file);
}


}
