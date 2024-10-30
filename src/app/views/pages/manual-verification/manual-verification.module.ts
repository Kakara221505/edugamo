import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualVerificationRoutingModule } from './manual-verification-routing.module';
import { ManualVerificationComponent } from './manual-verification.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgToggleModule } from 'ng-toggle-button';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { DateFormatPipe } from './date-format.pipe';


@NgModule({
  declarations: [ManualVerificationComponent, DateFormatPipe],
  imports: [
    CommonModule,
    ManualVerificationRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgToggleModule.forRoot(),
    FeahterIconModule
  ]
})
export class ManualVerificationModule { }
