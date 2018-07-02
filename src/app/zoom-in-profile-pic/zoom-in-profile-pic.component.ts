import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../user.service'
import {User} from '../user'


@Component({
  selector: 'app-zoom-in-profile-pic',
  templateUrl: './zoom-in-profile-pic.component.html',
  styleUrls: ['./zoom-in-profile-pic.component.css']
})
export class ZoomInProfilePicComponent implements OnInit {
  currentUser;
  constructor(public dialogRef: MatDialogRef<ZoomInProfilePicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public userService:UserService, public dialog: MatDialog) {
      this.currentUser = this.userService.currentUser
    }

  ngOnInit() {
  }

}
