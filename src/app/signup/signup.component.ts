import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {UserService} from '../user.service'
import {User} from '../user'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material';




@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  user:User = new User()
  hide = true;  
  constructor(public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,public userService:UserService) { }

  ngOnInit() {
    // this.user = this.data.user
  }
  sendNewUser(){
    this.userService.createNewUser(this.user);
    this.dialogRef.afterClosed().subscribe((data)=>{
      this.user = data
    });
    this.dialogRef.close()
  }

}
