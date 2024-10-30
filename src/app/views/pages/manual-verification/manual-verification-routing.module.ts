import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualVerificationComponent } from './manual-verification.component';

const routes: Routes = [{ path: '', component: ManualVerificationComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualVerificationRoutingModule { }
