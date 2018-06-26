import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FolderService } from '../folder.service';
import { File } from '../file';


@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {

  file: File = new File;
  @Output() fileUploaded: EventEmitter <File> = new EventEmitter();


  constructor(private folderService: FolderService ) { }

  ngOnInit() {
  }

  handleFileInput(files) {
    this.file.the_file = files.item(0);
    this.fileUploaded.emit(this.file.the_file);
    // this.uploadFileToActivity();
}

// uploadFileToActivity() {
//   this.folderService.postFile(this.file.the_file).subscribe(data => {
//     // do something, if upload success
//     }, error => {
//       console.log(error);
//     });
// }

}
