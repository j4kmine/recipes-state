
import {Injectable} from '@angular/core';
import {Actions,Effect} from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import {HttpClient,HttpRequest} from '@angular/common/http';
import {Recipe} from '../recipe.model';
import 'rxjs/operator/switchMap';
import 'rxjs/operator/withLatestFrom';
import {Store} from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducer';
@Injectable()
export class RecipeEffect{
    @Effect()
    recipeFetch = this.actions$
    .ofType(RecipeActions.FETCH_RECIPE)
    .switchMap((action:RecipeActions.fetchRecipe)=>{
        return  this.httpClient.get<Recipe[]>('https://ng-recipe-book-69bb2.firebaseio.com/recipes.json',{
            observe:'body',
            responseType:'json'
        })
        .map(
            (recipes)=>{
                for (let recipe of recipes){
                    if(!recipe['ingredients']){
                        recipe['ingredients']= [];
                    }
                }
                return {
                    type:RecipeActions.SET_RECIPES,
                    payload:recipes
                }
            }
        )
        
    })
    @Effect({dispatch:false})
    recipeStore = this.actions$
    .ofType(RecipeActions.STORE_RECIPE)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action,state])=>{
        const req = new HttpRequest('PUT','https://ng-recipe-book-69bb2.firebaseio.com/recipes.json'
        ,state.recipes,{reportProgress:true}
        )
        return this.httpClient.request(req);
    })
    constructor(private actions$:Actions,private httpClient:HttpClient,private store:Store<fromRecipe.FeatureState>){}
}