import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import {Subscription} from 'rxjs/Subscription';
import * as fromRecipe from '../store/recipe.reducer';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  recipeState : Observable<fromRecipe.State>;
  subcription:Subscription;
  constructor(private store:Store<fromRecipe.FeatureState>,private recipeService: RecipeService,private route:ActivatedRoute,private router:Router) {
  }

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }
  onNewRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){

  }
}
