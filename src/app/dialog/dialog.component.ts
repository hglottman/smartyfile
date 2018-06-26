import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { File } from '../file';
import { FolderService } from '../folder.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  form: FormGroup;
  description: File;


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogComponent>,
    private folderService: FolderService,
    @Inject(MAT_DIALOG_DATA) data) {
       console.log(data.folder_id);
       this.description = new File();
      this.description.folder_id = data.folder_id;
      this.description.upload_date = new Date();
  }


  ngOnInit() {

  }

  save() {
    console.log(this.description);
    this.dialogRef.close(
      this.folderService.addFile(this.description)
    );
  }

  close() {
    this.dialogRef.close();
  }

  handleFileUploaded(uploadedFile) {
    console.log('in handleFileUploaded, child class');
    // console.log(uploadedFile);
    this.description.the_file = uploadedFile;
    // console.log(this.description);


  }

}
