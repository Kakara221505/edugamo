import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SocialRoutingModule } from './social-routing.module';
import { SocialComponent } from './social.component';
import { NgToggleModule } from 'ng-toggle-button';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [SocialComponent],
  imports: [
    CommonModule,
    SocialRoutingModule,
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
export class SocialModule { }
