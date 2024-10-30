import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { NgToggleModule } from 'ng-toggle-button';
import { UserViewComponent } from './user-view/user-view.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FeahterIconModule } from 'src/app/core/feather-icon/feather-icon.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [UserComponent, UserViewComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    NgToggleModule.forRoot(),
    NgbDatepickerModule,
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
export class UserModule { }
