import * as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
export interface AppState{
  shoppingList : State
}
export interface State{
  ingredients:Ingredient[];
  editedIngredient:Ingredient;
  editedIngredientIndex:number;
}
const initialState : State ={
  ingredients:[
    new Ingredient('apple',5),
    new Ingredient('watermelaon',10)
  ],
  editedIngredient : null,
  editedIngredientIndex:-1
};
export function shoppingListReducer (state=initialState,actions:ShoppingListActions.ShoppingListActions){
  switch(actions.type){
    case ShoppingListActions.ADD_INGREDIENT:
     //take all state , change inredients part , take all ingredients value in ingredients , append with new value
     //from payload
      return {
        ...state,
        ingredients:[...state.ingredients,actions.payload]
      }
    case ShoppingListActions.ADD_INGREDIENTS:
      //take all state , change inredients part , take all ingredients value in ingredients , append with
     // new value array from payload
    return{
      ...state,
      ingredients:[...state.ingredients,...actions.payload]
    }
    case ShoppingListActions.UPDATE_INGREDIENT:
    const ingredient  = state.ingredients[state.editedIngredientIndex]; // get current igredient data
        //mean below overwrite ingredient
    const updateIngredient ={
      ...ingredient,
      ...actions.payload.ingredient
    }
    const ingredients = [...state.ingredients];
    ingredients[state.editedIngredientIndex] = updateIngredient;

    return {
      ...state,
      ingredients:ingredients,
      editedIngredient:null,
      editedIngredientIndex:-1
    }
    case ShoppingListActions.DELETE_INGREDIENT:
    const oldIngredient = [...state.ingredients];
    oldIngredient.splice(state.editedIngredientIndex,1);
    return{
      ...state,
      ingredients:oldIngredient,
      editedIngredient:null,
      editedIngredientIndex:-1
    }
    case ShoppingListActions.START_EDIT:
    const editedIngredient = {...state.ingredients[actions.payload]};
    return{
      ...state,
      editedIngredient:editedIngredient,
      editedIngredientIndex:actions.payload
    }
    case ShoppingListActions.STOP_EDIT:
    return{
      ...state,
      editedIngredient:null,
      editedIngredientIndex:-1
    }
    default:
    return state;
  }
}
