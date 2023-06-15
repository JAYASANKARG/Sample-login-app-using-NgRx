import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectAuth } from './store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  getState !: Observable<any>;
  isLoggedIn !:boolean;

  constructor(private router: Router , private store: Store<AppState["authState"]>){
    this.getState = this.store.pipe(select(selectAuth));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.getState.pipe().subscribe(data => {
        if(data.isAuthenticated){
          return true;
        }
        else{
          this.router.navigate(['']);
          return false;
        }
      })
      return this.isLoggedIn;
  }
  
}
