import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import { RouterModule, Routes, Router } from '@angular/router';
import { User } from '../user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log;
  showFiller = false;
  public currentUser : User;
  
  constructor(private userService:UserService, private router: Router) { 
    this.currentUser = this.userService.currentUser;
  }

  ngOnInit() {
  }
  getLogOut(){
    this.userService.LogOut()
    // .subscribe((data)=>{
    //   this.log = data
    //   this.router.navigate([''])
    // })
  }

}
