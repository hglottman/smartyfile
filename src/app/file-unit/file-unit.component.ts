import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { AllFilesComponent } from '../all-files/all-files.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ZoomInProfilePicComponent } from '../zoom-in-profile-pic/zoom-in-profile-pic.component'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-file-unit',
  templateUrl: './file-unit.component.html',
  styleUrls: ['./file-unit.component.css']
})
export class FileUnitComponent implements OnInit {
  @Input() file: File = new File();
  @Output() parentDelete: EventEmitter<File> = new EventEmitter();
  @Output() zoomFilePic: EventEmitter<string> = new EventEmitter();



  constructor(private dialog: MatDialog) { }

  ngOnInit() {

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

    function cellColorF(dayDifference) {
      if (0 < dayDifference && dayDifference < 15) {
        return '#b71c1c';
      } else if (14 < dayDifference && dayDifference < 31) {
        return '#FFCA28';
      } else if (dayDifference > 30) {
        return '#2196F3';
      } else {
        return 'white';
      }
    }

      return  cellColorF(difference);
  }

  inLargePicDialog() {

    this.zoomFilePic.emit(this.file.the_file)
    this.dialog.open(ZoomInProfilePicComponent)

  }

  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.file;
    this.dialog.open(DialogComponent, dialogConfig);
}

  deleteFile() {
    this.parentDelete.emit(this.file)
  }

}
