import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from './auth/auth.reducer';


export interface AppState {
    authState: auth.AuthState;
  }


  export const reducers = {
    auth: auth.AuthReducers
  };



  export const selectAuthState = createFeatureSelector<auth.AuthState>(
    auth.AuthFeatureKey
  );
  
  export const selectAuth = createSelector(
    selectAuthState,
    (state:auth.AuthState)=>state
);