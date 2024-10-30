import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPaylistComponent } from './admin-paylist.component';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';

const routes: Routes = [
  {
    path:'',
    component:AdminPaylistComponent
  },
  {
    path:'view:',
    component:PlaylistViewComponent
  },
  {
    path:'view/:id',
    component:PlaylistViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPaylistRoutingModule { }
