import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';


@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css']
})
export class AddfolderComponent implements OnInit {

  public newFolder : Folder = new Folder();
  public userId : number = 1;

  constructor(private folderService : FolderService) {
    this.newFolder.date = new Date();
    this.newFolder.is_active = true;
    this.newFolder.user_id = this.userId
   }

  ngOnInit() {

  }

  addNewFolder() {
    this.folderService.addNewFolder(this.newFolder, this.userId);
  }

}
