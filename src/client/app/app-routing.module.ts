import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkListComponent } from './park-list/park-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'parks',
    pathMatch: 'full'
  },
  {
    path: 'parks',
    component: ParkListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
