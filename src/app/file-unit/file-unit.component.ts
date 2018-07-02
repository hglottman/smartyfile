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



  constructor(private dialog : MatDialog) { }

  ngOnInit() {
    console.log(this.file)
    
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
