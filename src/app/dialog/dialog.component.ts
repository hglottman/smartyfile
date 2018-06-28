import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { saveAs} from 'file-saver';

const uri = 'http://localhost:3000/file_api/upload';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [FolderService]
})
export class DialogComponent implements OnInit {
  description: File;
  update: boolean;

uploader: FileUploader = new FileUploader({url: uri});

attachmentList: any = [];

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private folderService: FolderService,
    @Inject(MAT_DIALOG_DATA) data) {
      data.upload_date === undefined ? this.update = false : this.update = true;
       this.description = new File();
      this.description = data;

      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        this.attachmentList.push(JSON.parse(response));
      };
  }


  ngOnInit() {

  }

  save() {
    console.log(this.description);
    if (this.update === true) {
      console.log('got here to the if statment');
      this.dialogRef.close(
        this.folderService.editFile(this.description)
      ); } else {
        this.dialogRef.close(
          this.folderService.addFile(this.description)
        );
      }
  }

  close() {
    this.dialogRef.close();
  }

  download(index) {
    console.log(index);
const filename = this.attachmentList[index].uploadname;
console.log(filename);
this.folderService.downloadFile(filename).subscribe(
  data => saveAs(data, filename),
error => console.error(error)
);
  }

}
