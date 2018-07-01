import { Component, OnInit, Inject } from '@angular/core';
import {UserService} from '../user.service'
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from '../user';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {EdituserComponent} from '../edituser/edituser.component'



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log;
  showFiller = false;
  public currentUser:User
  constructor(public userService: UserService, public dialog: MatDialog, private router: Router) { 
    this.currentUser = userService.currentUser
  }

  ngOnInit() {
  }
  openDialog(currentUser) {
    console.log(currentUser);
    let dialogRef = this.dialog.open(EdituserComponent, {

      data: { currentUser: currentUser }
    });
  }
  getLogOut(){
    this.userService.LogOut()
    // this.router.navigated
    // .subscribe((data)=>{
    //   this.log = data
    //   this.router.navigate([''])
    // })
  }

}
