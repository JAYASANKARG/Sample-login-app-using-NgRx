import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Login } from 'src/models/login.model';
import { User } from 'src/models/user.model';
import { AppState, selectAuth, selectAuthState } from 'src/store/app.state';
import { LogIn, LogInFailure } from 'src/store/auth/auth.action';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  login :Login = new Login();
  getState !: Observable<any>;
  errorMessage !: string | null;
  lastUserState !: User;

  constructor(private store: Store<AppState["authState"]>,private router: Router ) { 
    this.getState = this.store.pipe(select(selectAuth));
    this.store.pipe().subscribe((data:any) => {this.errorMessage =  data.errorMessage});
  }

  ngOnInit(): void {
    this.store.subscribe( (data:any) => {if(data.Authtest.isAuthenticated) this.router.navigate(['user/dashboard']);});
  }

  onSubmit(){

    let flag= false

    this.getState.pipe().subscribe(data => {
      data.users.forEach((element:any) => {
        if(element.email == this.login.email && element.password == this.login.password){
          flag = true;
          this.lastUserState = element;
        }
      });
    })
    if(!flag){
      this.store.dispatch(new LogInFailure(this.login));
      this.store.subscribe( (data:any) => {this.errorMessage =  data.Authtest.errorMessage;});
    }
    else{
      this.store.dispatch(new LogIn(this.lastUserState));
      this.router.navigate(['user/dashboard']);
    }

    this.login = new Login();
  }
}
