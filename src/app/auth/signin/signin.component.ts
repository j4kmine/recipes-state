import { Component, OnInit } from '@angular/core';
import{AuthService} from '../auth.service';
import { NgForm } from '@angular/forms';
import {Store} from '@ngrx/store';
import * as AuthActions from '../store/auth.actions';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthService,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
  }
  onSignin(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.trySignin({username:email,password:password}));
  }

}
