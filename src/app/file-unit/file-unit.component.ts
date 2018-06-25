import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { File } from '../file';
import { FolderService } from '../folder.service';
import { AllFilesComponent } from '../all-files/all-files.component';

@Component({
  selector: 'app-file-unit',
  templateUrl: './file-unit.component.html',
  styleUrls: ['./file-unit.component.css']
})
export class FileUnitComponent implements OnInit {

  @Input() file: File = new File();


  constructor() { }

  ngOnInit() {
    console.log(this.file);
  }


}
