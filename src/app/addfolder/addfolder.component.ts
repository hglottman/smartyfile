import { Component, OnInit, Input } from '@angular/core';
import { Folder } from '../folder';
import { FolderService } from '../folder.service';


@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css']
})
export class AddfolderComponent implements OnInit {

  public newFolder: Folder = new Folder();
  public user_id: number;
  toggleInput:boolean = false

  constructor(private folderService: FolderService) { }

  ngOnInit() {
    this.toggleInput = false
    this.user_id = this.folderService.currentUser.user_id
      this.newFolder.date = new Date();
      this.newFolder.is_active = true;
      this.newFolder.user_id = this.user_id
    
  }

  addNewFolder() {
    this.toggleInput = true
    this.folderService.addNewFolder(this.newFolder, this.user_id);
  }

}
