import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { Folder } from '../folder';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

  public userFolders : Folder[];
  public newFolder : Folder;
  public userId = 1;
  constructor(private folderService : FolderService) {

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

  addNewFolder() {
    
  }

}
