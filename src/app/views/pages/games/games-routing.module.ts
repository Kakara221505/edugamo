import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesComponent } from './games.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { CreateGameEditComponent } from './create-game-edit/create-game-edit.component';

const routes: Routes = [
  {
    path: '',
    component: GamesComponent,
    
  },
  { path: 'create', component: CreateGameComponent },
  {
    path: 'edit',
    component: CreateGameEditComponent
  },
  {
    path: 'edit/:id',
    component: CreateGameEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
