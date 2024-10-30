import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlaggedGameComponent } from './flagged-game.component';

const routes: Routes = [
  {
    path : '',
    component:FlaggedGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlaggedGameRoutingModule { }
