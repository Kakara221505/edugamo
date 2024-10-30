import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameTemplateRoutingModule } from './game-template-routing.module';
import { GameTemplateComponent } from './game-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgToggleModule } from 'ng-toggle-button';


@NgModule({
  declarations: [GameTemplateComponent],
  imports: [
    CommonModule,
    GameTemplateRoutingModule,
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
export class GameTemplateModule { }
