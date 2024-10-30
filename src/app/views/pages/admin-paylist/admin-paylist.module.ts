import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPaylistRoutingModule } from './admin-paylist-routing.module';
import { PlaylistViewComponent } from './playlist-view/playlist-view.component';
import { NgToggleModule } from 'ng-toggle-button';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';


@NgModule({
  declarations: [PlaylistViewComponent],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    FeahterIconModule,
    ReactiveFormsModule,
    AdminPaylistRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgToggleModule.forRoot(),
    NgxPaginationModule,  

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminPaylistModule { }
