import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamesRoutingModule } from './games-routing.module';
import { GamesComponent } from './games.component';
import { CreateGameComponent } from './create-game/create-game.component';
import { NgToggleModule } from 'ng-toggle-button';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateGameEditComponent } from './create-game-edit/create-game-edit.component';


@NgModule({
  declarations: [GamesComponent, CreateGameComponent, CreateGameEditComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
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
export class GamesModule { }
