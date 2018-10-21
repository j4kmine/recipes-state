import *as ShoppingListActions from './shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
const initialState ={
  ingredients:[
    new Ingredient('apple',5),
    new Ingredient('watermelaon',10)
  ]
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
    const ingredient  = state.ingredients[actions.payload.index]; // get current igredient data
        //mean below overwrite ingredient
    const updateIngredient ={
      ...ingredient,
      ...actions.payload.ingredient
    }
    console.log(ingredient);
    const ingredients = [...state.ingredients];
    ingredients[actions.payload.index] = updateIngredient;

    return {
      ...state,
      ingredients:ingredients
    }
    case ShoppingListActions.DELETE_INGREDIENT:
    const oldIngredient = [...state.ingredients];
    oldIngredient.splice(actions.payload,1);
    return{
      ...state,
      ingredient:oldIngredient
    }
    default:
    return state;
  }
}
