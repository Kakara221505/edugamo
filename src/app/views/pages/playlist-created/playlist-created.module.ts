import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistCreatedRoutingModule } from './playlist-created-routing.module';
import { PlaylistCreatedComponent } from './playlist-created.component';
import { NgToggleModule } from 'ng-toggle-button';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { PlaylistCreatedViewComponent } from './playlist-created-view/playlist-created-view.component';

@NgModule({
  declarations: [PlaylistCreatedComponent, PlaylistCreatedViewComponent],
  imports: [
    CommonModule,
    PlaylistCreatedRoutingModule,
    NgToggleModule.forRoot(),
    FeahterIconModule,
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlaylistCreatedModule { }
