import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: Array<User> = new Array<User>();
  user: User
  currentUser;
  log;
  public userUpdate: Observable<User[]>
  public userSubject: Subject<User[]>
  constructor(private http: HttpClient, private router: Router) {
    this.userSubject = new Subject<User[]>();
    this.userUpdate = this.userSubject.asObservable()
  }
  // getOneUser(userName,password){
  //   this.http.get<User>('/loginApi/'+userName+password).subscribe((data)=>{
  //     this.user = data;
  //     // this.userSubject.next()
  //   })
  // }

  Login(username, password) {
    this.http.post('/login', { username: username, password: password }).subscribe((data) => {
      if (data === false) {
        this.router.navigate([''])        
        alert('user name or password not correct, Please try again')
      } else {
        this.currentUser = data
        this.router.navigate(['folder'])
        //need to check this function is we have issues with the login autherntication
      }
    })
  }
  LogOut(){
    return this.http.get('/logout',{responseType: 'text'}).subscribe((data)=>{
      console.log(data)
      this.log = data
      this.router.navigate([''])
    })
  }
  createNewUser(user: User) {
    this.http.post<User>('/login_api/addUser', { user: user }).subscribe((data) => {
      console.log(data)
      this.users.push(data);
      this.userSubject.next(this.users)
    })
  }
}
