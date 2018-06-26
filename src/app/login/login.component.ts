import { Component, OnInit, Inject} from '@angular/core';
import {UserService} from '../user.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {User} from '../user'
import {SignupComponent} from '../signup/signup.component'
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes ,Router} from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User
  hide = true;
  username;
  password;
  constructor(public userService:UserService,public dialog: MatDialog,private router:Router) { }

  ngOnInit() {
  }
  openDialog(user) {
    console.log(user);
    let dialogRef = this.dialog.open(SignupComponent, {
     
      data:{user: user}
    });
  }
  login(){
    this.userService.Login(this.username,this.password)
    // this.router.navigate(['folder'])
  }

  

}
