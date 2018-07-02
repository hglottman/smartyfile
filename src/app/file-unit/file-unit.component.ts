import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { AllFilesComponent } from '../all-files/all-files.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import {ZoomInFilePicComponent} from '../zoom-in-file-pic/zoom-in-file-pic.component'

@Component({
  selector: 'app-file-unit',
  templateUrl: './file-unit.component.html',
  styleUrls: ['./file-unit.component.css']
})
export class FileUnitComponent implements OnInit {
  currentFile;
  @Input() file: File = new File();
  @Output() parentDelete: EventEmitter<File> = new EventEmitter();



  constructor(private dialog : MatDialog) { }

  ngOnInit() {
  }

  zoomInImg(currentFile) {
    this.currentFile = this.file
    // console.log(this.currentFile)
    let dialogRef = this.dialog.open(ZoomInFilePicComponent)
  }
  openDialog() {
  
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.file;
    this.dialog.open(DialogComponent, dialogConfig);
}

deleteFile () {
  this.parentDelete.emit(this.file)
}


}
