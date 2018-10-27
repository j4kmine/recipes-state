import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {Subscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from '../../store/app.reducer';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  @ViewChild('f')slForm:NgForm;
  subcription:Subscription;
  editMode = false;
  editItemIndex:number;
  editedItem:Ingredient;
  constructor(private slService: ShoppingListService,private store:Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subcription = this.store.select('shoppingList')
      .subscribe(
        data=>{
          if(data.editedIngredientIndex > -1){
            this.editItemIndex =data.editedIngredientIndex;
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name:data.editedIngredient.name,
              amount:data.editedIngredient.amount
            });
          }else{
            this.editMode = false;
          }
        }
      )

  }
  ngOnDestroy(){
    this.subcription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){

    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
 
    // this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }
  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode == true){
      this.store.dispatch(new ShoppingListActions.EditIngredient({ingredient:newIngredient}));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

}
