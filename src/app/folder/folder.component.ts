import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { UserService } from '../user.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  public userFolders : Folder[];
  public newFolder : Folder;
  public currentUser;
  public isActive = false;
  loading:boolean = false

  constructor(private folderService : FolderService, private dialog : MatDialog, private userService : UserService) {
   }

  ngOnInit() {
    this.loading = true
      this.currentUser = this.folderService.currentUser;
      this.folderService.getUserFolders(this.currentUser.user_id);
      this.folderService.allFoldersObservable.subscribe((data) => {
        this.loading = false
        this.userFolders = data;
  
      })
    
  }

  toggleAddingNewFolder() {

    this.isActive === false ? this.isActive = true : this.isActive = false;
  }

  deleteFolder(folder) {
    this.folderService.deleteFolder(folder);
  }

  getUserFiles(folder_id) {
    this.folderService.getAllFiles(folder_id);
    this.loading = true    
  }

  

  openDialog(folder) {
    let folder_id = folder.folder_id;
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        folder_id: folder_id,
    };

    this.dialog.open(DialogComponent, dialogConfig);
}

}
