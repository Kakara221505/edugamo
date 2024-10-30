import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesCreatedComponent } from './games-created.component';

const routes: Routes = [
  {
    path:'',
    component:GamesCreatedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesCreatedRoutingModule { }
