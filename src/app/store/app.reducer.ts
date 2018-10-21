import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import {ActionReducerMap} from '@ngrx/store';
export interface AppState{
  shoppingList:fromShoppingList.State,
  auth:fromAuth.State
}
//actionreducermap generic type take state as input ,to register all reducer rather than
//passing one by one in app module.ts
//the name should be the same
export const reducers:ActionReducerMap<AppState>={
  shoppingList:fromShoppingList.shoppingListReducer,
  auth:fromAuth.authReducer
}
