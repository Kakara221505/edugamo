import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesCreatedRoutingModule } from './games-created-routing.module';
import { GamesCreatedComponent } from './games-created.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgToggleModule } from 'ng-toggle-button';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [GamesCreatedComponent],
  imports: [
    CommonModule,
    GamesCreatedRoutingModule,
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
export class GamesCreatedModule { }
