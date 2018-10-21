import {Action} from '@ngrx/store';
export const SIGNUP = 'SIGNUP';
export const SIGNIN ='SIGNIN';
export const LOGOUT ='LOGOUT';
export const SET_TOKEN ='SET_TOKEN';
export const TRY_SIGNUP ='TRY_SIGNUP';
export const TRY_SIGNIN ='TRY_SIGNIN';
export class trySignup implements Action{
  readonly type = TRY_SIGNUP;
  constructor(public payload:{username:string,password:string}){}
}
export class trySignin implements Action{
  readonly type = TRY_SIGNIN;
  constructor(public payload:{username:string,password:string}){}
}
export class signUp implements Action{
  readonly type = SIGNUP;
}
export class signIn implements Action{
  readonly type = SIGNIN;
}
export class logOut implements Action{
  readonly type = LOGOUT;
}
export class setToken implements Action{
  readonly type = SET_TOKEN;
  constructor(public payload:string){}
}
export type Authentication = signUp | signIn | logOut | setToken | trySignup | trySignin ;

