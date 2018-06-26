import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  public userFolders : Folder[];
  public newFolder : Folder;
  public userId = 1;
  constructor(private folderService : FolderService, private dialog : MatDialog) {

   }

  ngOnInit() {
    this.folderService.getUserFolders(this.userId);
    this.folderService.allFoldersObservable.subscribe((data) => {
      this.userFolders = data;
    })
  }

  deleteFolder(folder_id: number) {
    this.folderService.deleteFolder(folder_id);
  }

  getUserFiles(folder_id) {
    this.folderService.getAllFiles(folder_id);
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(DialogComponent, dialogConfig);
}

}
