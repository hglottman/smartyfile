import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { File } from '../file';
import { FolderService } from '../folder.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  description: File;
  update: boolean;
  newFile = new FormData();


  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private folderService: FolderService,
    @Inject(MAT_DIALOG_DATA) data) {
    data.upload_date === undefined ? this.update = false : this.update = true;
    this.description = new File();
    this.description = data;
  }


  ngOnInit() {

  }

  save() {
    console.log(this.description.file_name)
    
    if (this.description.upload_date !== undefined ) {
      this.dialogRef.close(
        this.folderService.editFile(this.description)

      )
    } else {
      this.folderService.postNewFile(this.newFile).subscribe((filename) => {
        this.description.the_file = filename;
        this.dialogRef.close(
          this.folderService.addFile(this.description).subscribe(() => {
            this.description = new File();
          })
        )
      }
      )
    }
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    this.newFile.append('file', event.target.files[0], event.target.files[0].name)
  }

}
