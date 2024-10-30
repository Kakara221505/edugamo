import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubjectsRoutingModule } from './subjects-routing.module';
import { SubjectsComponent } from './subjects.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [SubjectsComponent],
  imports: [
    CommonModule,
    SubjectsRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbDatepickerModule,
    FeahterIconModule,
    NgxPaginationModule,
    NgxSpinnerModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SubjectsModule { }
