import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const appRoutes = [
  { path: '', loadChildren: './pick-list/pick-list.module#PickListModule' },
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
