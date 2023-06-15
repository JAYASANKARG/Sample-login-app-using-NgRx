import { AuthState } from './../../../store/auth/auth.reducer';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/models/user.model';
import { AppState, selectAuth } from 'src/store/app.state';
import { SignUp, SignUpFailure } from 'src/store/auth/auth.action';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  getState !: Observable<any>;
  errorMessage !: string;
  
  constructor(private store: Store<AppState["authState"]>) {
    this.getState = this.store.pipe(select(selectAuth));
    this.store.pipe().subscribe(data => {this.errorMessage =  data.errorMessage});
    
   }

  ngOnInit(): void {
    
  }

  onSubmit(): void {

    let flag= false

    this.getState.pipe().subscribe(data => {
      data.users.forEach((element:any) => {
        if(element.email == this.user.email){
          flag = true
        }
      });
    })

    if(flag){
      this.store.dispatch(new SignUpFailure(this.user));
      this.store.subscribe( (data:any) => {this.errorMessage =  data.Authtest.errorMessage;});
    }
    else{
      this.store.dispatch(new SignUp(this.user));
      
    }
    
    this.user = new User();
    
  }

}
