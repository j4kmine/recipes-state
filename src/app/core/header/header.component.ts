import { Component, EventEmitter, Output,OnInit} from '@angular/core';
import {DataStorageService} from '../../shared/data-storage.service';
import{HttpEvent, HttpEventType}from '@angular/common/http';
import{AuthService}from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducer';
import * as fromAuth from  '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.actions';
import {Store}from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  @Output() featureSelected = new EventEmitter<string>();
  authState:Observable<fromAuth.State>;
  constructor(private datastorageservice:DataStorageService
    ,private authservice:AuthService
    ,private store:Store<fromApp.AppState>
  ){

  }
  ngOnInit(){
    this.authState = this.store.select('auth');
  }
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
  onFetchData(){
    this.datastorageservice.getRecipes();
  }
  onLogout(){
    this.store.dispatch(new AuthActions.logOut());
  }
  onSaveData(){
   this.datastorageservice.storeRecipe().subscribe(
      (response)=>{
       console.log(response);
     }
    //  (response:HttpEvent<Object>)=>{
    //    console.log(response.type === HttpEventType.Sent);
    //  }
   )
  }
}
