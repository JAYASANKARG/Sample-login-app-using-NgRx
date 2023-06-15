import { User } from "src/models/user.model";
import { All, AuthActionTypes } from "./auth.action";

export const AuthFeatureKey = 'Authtest';

export interface AuthState {
    // is a user authenticated?
    isAuthenticated: boolean;
    // if authenticated, there should be a user object
    user: User;
    // error message
    errorMessage: string ;
    users :any;
  }


  export const initialState: AuthState = {
    isAuthenticated: false,
    user: new User,
    errorMessage: "",
    users:[]
  };


  export function AuthReducers(state = initialState, action: All): AuthState {
    switch (action.type) {

      
      case AuthActionTypes.LOGIN: {
        return {
          ...state,
          isAuthenticated: true,
          user: {
            name: action.payload.name,
            email: action.payload.email,
            password:action.payload.password,
          },
          errorMessage: ""
        };
      }

      case AuthActionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          errorMessage: 'Incorrect email and/or password.'
        };
      }

      case AuthActionTypes.SIGNUP: {
        return {
          ...state,
          isAuthenticated: false,
          users : [...state.users,action.payload],
        };
      }

      case AuthActionTypes.SIGNUP_FAILURE: {
        return {
          ...state,
          errorMessage: 'That email is already in use.'
        };
      }

      case AuthActionTypes.LOGOUT: {
        return {
          ...state,
          isAuthenticated: false,
          user: {
            name: "",
            email: "",
            password:"",
          },
          errorMessage: ""
        };
      }

      default: {
        return state;
      }
    }
  }

  