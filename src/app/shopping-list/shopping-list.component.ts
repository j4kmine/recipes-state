import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from  'rxjs/Subscription';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients: Ingredient[];
  shoppingListState : Observable<{ingredients:Ingredient[]}>;// define where we save our store data
  // private subscription:Subscription;
  constructor(private slService: ShoppingListService,private store:Store<fromApp.AppState>) { }
  onEditItem(index:number){
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.subscription = this.slService.ingredientsChanged
    //   .subscribe(
    //     (ingredients: Ingredient[]) => {
    //       this.ingredients = ingredients;
    //     }
    //   );
  }
  ngOnDestroy(){
    // this.subscription.unsubscribe;
  }
}
