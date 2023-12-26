import { Routes } from '@angular/router';
import {KittenListComponent} from "./components/main/view/kitten-list/kitten-list.component";
import {KittenFormComponent} from "./components/main/forms/kitten-form/kitten-form.component";
import {KittenRetrieveComponent} from "./components/main/view/kitten-retrieve/kitten-retrieve.component";

export const routes: Routes = [
  {path: '', component: KittenListComponent},
  {path: 'kitten/:id', component: KittenRetrieveComponent},
  {path: 'create', component: KittenFormComponent},
  {path: 'edit/:id', component: KittenFormComponent},
  {path: 'mycats', component: KittenListComponent},
  {path: 'mycats/:id', component: KittenRetrieveComponent},
];
