import { Injectable } from "@angular/core";
import {Actions,Effect} from '@ngrx/effects';
import * as AuthActions from '../store/auth.actions';
import { fromPromise } from "rxjs/internal-compatibility";
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects{
  @Effect()
  authSignup = this.action$.ofType(AuthActions.TRY_SIGNUP)
  .map((action:AuthActions.trySignup)=>{
      return action.payload;
  })
  .switchMap((authData:{username:string,password:string})=>{
    return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username,authData.password));
  })
  .switchMap(()=>{
    return fromPromise(firebase.auth().currentUser.getIdToken());
  })
  .mergeMap((token:string)=>{
    return[
      {
        type:AuthActions.SIGNUP
      },
      {
        type:AuthActions.SET_TOKEN,
        payload:token
      }
    ]
  });
  @Effect()
  authSignin = this.action$.ofType(AuthActions.TRY_SIGNIN)
  .map((action:AuthActions.trySignin)=>{

      return action.payload;
  })
  .switchMap((authData:{username:string,password:string})=>{

    return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username,authData.password));
  })
  .switchMap(()=>{
    return fromPromise(firebase.auth().currentUser.getIdToken());
  })
  .mergeMap((token:string)=>{
    this.router.navigate(['/']);
    return[
      {
        type:AuthActions.SIGNIN
      },
      {
        type:AuthActions.SET_TOKEN,
        payload:token
      }
    ]
  });
  @Effect({dispatch:false})
  authLogout = this.action$
  .ofType(AuthActions.LOGOUT)
  .do(()=>{
    this.router.navigate(['/']);
  });
  constructor(private action$:Actions,private router:Router){}


}
