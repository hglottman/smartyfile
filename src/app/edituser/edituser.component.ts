import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../user.service'
import {User} from '../user'
import { RouterModule, Routes, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit { 
  user:User;
  constructor(public dialogRef: MatDialogRef<EdituserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public userService:UserService, public dialog: MatDialog, private router: Router) { 
      this.user = this.userService.currentUser
    }

  ngOnInit() {
    // this.user = this.data.user
    // console.log(this.data.user)
  }
  sendUpdateUser(){
    this.userService.editUser(this.user);
    this.dialogRef.afterClosed().subscribe(data => {
      this.user = data
    });
    this.dialogRef.close()
  }

}
