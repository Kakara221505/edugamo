import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { NgToggleModule } from 'ng-toggle-button';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [],
  imports: [
    PrivacyPolicyRoutingModule,
    NgToggleModule.forRoot(),
    FeahterIconModule,
    CommonModule,
    CKEditorModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivacyPolicyModule { }
