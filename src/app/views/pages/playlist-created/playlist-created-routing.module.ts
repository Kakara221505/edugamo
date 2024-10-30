import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlaylistCreatedComponent } from './playlist-created.component';
import { PlaylistCreatedViewComponent } from './playlist-created-view/playlist-created-view.component';

const routes: Routes = [
  {
    path:'',
    component:PlaylistCreatedComponent
  },
  {
    path:'view:',
    component:PlaylistCreatedViewComponent
  },
  {
    path:'view/:id',
    component:PlaylistCreatedViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlaylistCreatedRoutingModule { }
