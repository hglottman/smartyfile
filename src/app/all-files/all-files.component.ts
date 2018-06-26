import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { File } from '../file';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUnitComponent } from '../file-unit/file-unit.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {

  files = new Array<File>();

  constructor(private folderService: FolderService,  private route : ActivatedRoute, private dialog : MatDialog) {}

    ngOnInit() {
      this.route.params.subscribe(params => {
          this.folderService.getAllFiles(params.id);
        });
          this.folderService.allFilesObservable.subscribe((files) => {
        this.files = files;
        console.log(this.files);
     });

  }

}
