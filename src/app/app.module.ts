import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { User } from 'src/models/user.model';
import { FormsModule } from '@angular/forms';
import { Login } from 'src/models/login.model';
import { StoreModule } from '@ngrx/store';
import { reducers, selectAuthState } from '../store/app.state';
import { AuthFeatureKey, AuthReducers } from 'src/store/auth/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthGuard } from 'src/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'user/dashboard', component: HomeComponent ,canActivate: [AuthGuard]},
      { path: 'sign-up', component: SignUpComponent },
      { path: '', component: LogInComponent },
      { path: '**', redirectTo: '' }
    ]),
    FormsModule,
    StoreModule.forRoot(reducers.auth),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
    }),
    StoreModule.forFeature(AuthFeatureKey,AuthReducers)
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
