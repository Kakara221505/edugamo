import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsentRoutingModule } from './consent-routing.module';
import { ConsentComponent } from './consent.component';
import { NgToggleModule } from 'ng-toggle-button';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [ConsentComponent],
  imports: [
    CommonModule,
    ConsentRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgbDatepickerModule,
    FeahterIconModule,
    NgxPaginationModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConsentModule {}
