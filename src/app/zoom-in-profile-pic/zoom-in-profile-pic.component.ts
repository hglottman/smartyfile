import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../user.service'
import {User} from '../user'
import { FolderService } from '../folder.service'
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-zoom-in-profile-pic',
  templateUrl: './zoom-in-profile-pic.component.html',
  styleUrls: ['./zoom-in-profile-pic.component.css']
})
export class ZoomInProfilePicComponent implements OnInit {
  currentUser;
  filePic;
  constructor(public dialogRef: MatDialogRef<ZoomInProfilePicComponent>,
    public folderService:FolderService,
    @Inject(MAT_DIALOG_DATA) public data: any,public userService:UserService, public dialog: MatDialog) {
      this.currentUser = this.userService.currentUser
    }

  ngOnInit() {
    this.folderService.zoomPicObservable.subscribe((data)=>{
      console.log('zoomin')
      console.log(data)
      this.filePic = data;
    })
  }

}
