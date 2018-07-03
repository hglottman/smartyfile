import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from "@angular/material";
import { FormGroup, FormBuilder } from '@angular/forms';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { FilepicComponent } from '../filepic/filepic.component'


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  description: File;
  update: boolean;
  newFile = new FormData();
  toggelRadio: string = "1"
  filePic;
  loading:boolean = false
  show = true;


  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private folderService: FolderService,
    @Inject(MAT_DIALOG_DATA) data, public dialog: MatDialog) {
    data.upload_date === undefined ? this.update = false : this.update = true;
    this.description = new File();
    this.description = data;
  }


  ngOnInit() {
    this.loading = false
    this.folderService.filePicObservable.subscribe((data) => {
      this.filePic = data
    })

  }
  openDialog() {
    let dialogRef = this.dialog.open(FilepicComponent);
  }

  save() {
    this.loading = true
    this.show = false
    console.log(this.description.file_name)

    if (this.description.upload_date !== undefined) {
      this.dialogRef.close(
        this.folderService.editFile(this.description)

      )
    } else {
      if (this.filePic !== undefined) {
        this.description.the_file = this.filePic;
        this.dialogRef.close(
          this.folderService.addFile(this.description).subscribe(() => {
            this.description = new File();
          })
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
  }

  close() {
    this.dialogRef.close();
  }

  onFileSelected(event) {
    this.newFile.append('file', event.target.files[0], event.target.files[0].name)
  }

}
