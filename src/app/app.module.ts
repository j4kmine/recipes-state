import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {shoppingListReducer} from './shopping-list/store/shopping-list.reducer';
import { HttpClientModule } from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import { AppComponent } from './app.component';
import {AppRoutingModule} from './app.routing.module';
import{ShoppingListModule} from './shopping-list/shopping-list.module';
import {SharedModule} from './shared/shared.module';
import {AuthModule} from './auth/auth.module';
import {CoreModule}from './core/core.module';
import{reducers} from './store/app.reducer';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
