import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HttpClientModule} from '@angular/common/http';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminPaylistComponent } from './views/pages/admin-paylist/admin-paylist.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgToggleModule } from 'ng-toggle-button';
import { PrivacyPolicyComponent } from './views/pages/privacy-policy/privacy-policy.component';
import { ClipboardModule } from 'ngx-clipboard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AdminPaylistComponent,
    PrivacyPolicyComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CKEditorModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgbModule,
    ClipboardModule,
    NgToggleModule.forRoot()
    
  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
