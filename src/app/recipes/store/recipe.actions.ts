import {Action}from '@ngrx/store';
import {Recipe} from '../recipe.model';
export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPES = 'ADD_RECIPES';
export const UPDATE_RECIPES = 'UPDATE_RECIPES';
export const DELETE_RECIPES ='DELETE_RECIPES';
export class setRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload:Recipe[]){}
}
export class addRecipe implements Action {
  readonly type = ADD_RECIPES;
  constructor(public payload:Recipe){}
}
export class updateRecipe implements Action {
  readonly type = UPDATE_RECIPES;
  constructor(public payload:{index:number,updateRecipe:Recipe}){}
}
export class deleteRecipe implements Action {
  readonly type = DELETE_RECIPES;
  constructor(public payload:number){}
}
export type RecipeActions = setRecipes | addRecipe | updateRecipe | deleteRecipe;
