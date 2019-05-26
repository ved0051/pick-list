import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickListComponent } from './components/pick-list/pick-list.component';
import { RouterModule } from '@angular/router';
import { ItemCrateComponent } from './components/item-crate/item-crate.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatButtonModule, MatCardModule, MatInputModule} from '@angular/material';

const appRoutes = [
  { path: '', redirectTo: 'pick-list', pathMatch: 'full' },
  { path: 'pick-list', component: PickListComponent },
  { path: 'item-crate', component: ItemCrateComponent },
  { path: '**', redirectTo: 'pick-list' }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(appRoutes),
    MatButtonModule,
    MatCardModule,
    MatInputModule
  ],
  declarations: [PickListComponent, ItemCrateComponent]
})
export class PickListModule { }
