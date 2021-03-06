import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute,Params ,Router} from '@angular/router' ;
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from '../../shopping-list/store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';
import * as fromRecipe from '../store/recipe.reducer';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 recipe: Recipe;
 recipeState :Observable<fromRecipe.State>;
 id:number;
 shoppingListState : Observable<{ingredients:Ingredient[]}>;
  constructor(private store :Store<fromRecipe.FeatureState>,private router:Router,private recipeService: RecipeService, private shop:ShoppingListService,private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params:Params)=>{
        this.id = + params['id'];
        this.recipeState = this.store.select('recipes');
      }
    )
  }
  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route});
  }
  onAddToShoppingList() {
    // this.shop.addIngredients(this.recipe.ingredients);
    this.store.select('recipes')
    .take(1)
    .subscribe((recipeState:fromRecipe.State)=>{
      this.store.dispatch(new ShoppingListActions.AddIngredients(recipeState.recipes[this.id].ingredients));
    });

    // this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.store.dispatch(new RecipeActions.deleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
