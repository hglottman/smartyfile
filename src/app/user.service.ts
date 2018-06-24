import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  users:Array<User>
  user:User
  public userUpdate: Observable<User[]>
  public userSubject: Subject<User[]>
  constructor(private http: HttpClient) {
    this.userSubject = new Subject<User[]>();
    this.userUpdate = this.userSubject.asObservable()
  }
  // getOneUser(userName,password){
  //   this.http.get<User>('/loginApi/'+userName+password).subscribe((data)=>{
  //     this.user = data;
  //     // this.userSubject.next()
  //   })
  // }
  createNewUser(userData:User){
    this.http.post<User>('/loginApi/addUser',{userData:userData}).subscribe((data)=>{
      this.users.push(data);
      this.userSubject.next(this.users)
    })
  }
}
