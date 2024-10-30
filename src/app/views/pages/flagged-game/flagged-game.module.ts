import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlaggedGameRoutingModule } from './flagged-game-routing.module';
import { FlaggedGameComponent } from './flagged-game.component';
import { NgToggleModule } from 'ng-toggle-button';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FlaggedGameComponent],
  imports: [
    CommonModule,
    FlaggedGameRoutingModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgToggleModule.forRoot(),
    NgxPaginationModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FlaggedGameModule { }
