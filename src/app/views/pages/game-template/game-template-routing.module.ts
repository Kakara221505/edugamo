import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameTemplateComponent } from './game-template.component';

const routes: Routes = [
  {
    path: '',
    component: GameTemplateComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameTemplateRoutingModule { }
