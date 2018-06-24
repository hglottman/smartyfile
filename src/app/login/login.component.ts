import { Component, OnInit, Inject} from '@angular/core';
import {UserService} from '../user.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../user'
import {SignupComponent} from '../signup/signup.component'
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User
  constructor(public userService:UserService,public dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(user) {
    console.log(user);
    let dialogRef = this.dialog.open(SignupComponent, {
      data:{user: user}
    });
  }
  login(){
    
  }

}
