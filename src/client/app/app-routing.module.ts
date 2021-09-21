import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParkListComponent } from './park-list/park-list.component';
import { ParkDetailComponent } from './park-detail/park-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'parks',
    pathMatch: 'full'
  },
  {
    path: 'parks',
    component: ParkListComponent
  },
  {
    path: 'park/:id', 
    component:ParkDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
