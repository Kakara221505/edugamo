import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BulkGameCreateComponent } from './bulk-game-create.component';
import { AddBulkGameComponent } from './add-bulk-game/add-bulk-game.component';

const routes: Routes = [

  {
    path: '',
    component: BulkGameCreateComponent,
    
  },
  {
    path: 'create',
    component: AddBulkGameComponent,
    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BulkGameCreateRoutingModule { }
