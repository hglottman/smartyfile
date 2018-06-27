import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service'
import { RouterModule, Routes, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  log;
  showFiller = false;
  constructor(private userService:UserService, private router: Router) { }

  ngOnInit() {
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
