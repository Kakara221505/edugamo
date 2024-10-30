import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkGameCreateRoutingModule } from './bulk-game-create-routing.module';
import { BulkGameCreateComponent } from './bulk-game-create.component';
import { AddBulkGameComponent } from './add-bulk-game/add-bulk-game.component';

import { NgToggleModule } from 'ng-toggle-button';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';


@NgModule({
  declarations: [BulkGameCreateComponent, AddBulkGameComponent],
  imports: [
    CommonModule,
    BulkGameCreateRoutingModule,
    NgToggleModule.forRoot(),
    ArchwizardModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgbDatepickerModule,
    FeahterIconModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BulkGameCreateModule { }
