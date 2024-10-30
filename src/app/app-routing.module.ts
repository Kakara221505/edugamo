import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'user',
        loadChildren: () => import('./views/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./views/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'game',
        loadChildren: () => import('./views/pages/games/games.module').then(m => m.GamesModule)
      },
      {
        path: 'bulk-game',
        loadChildren: () => import('./views/pages/bulk-game-create/bulk-game-create.module').then(m => m.BulkGameCreateModule)
      },
      {
        path: 'playlist',
        loadChildren: () => import('./views/pages/admin-paylist/admin-paylist.module').then(m => m.AdminPaylistModule)
      },
      {
        path: 'user/playlist',
        loadChildren: () => import('./views/pages/playlist-created/playlist-created.module').then(m => m.PlaylistCreatedModule)
      },
      {
        path: 'game/created',
        loadChildren: () => import('./views/pages/games-created/games-created.module').then(m => m.GamesCreatedModule)
      },
      {
        path: 'subjects',
        loadChildren: () => import('./views/pages/subjects/subjects.module').then(m => m.SubjectsModule)
      },
      { path: 'manual-verification', loadChildren: () => import('./views/pages/manual-verification/manual-verification.module').then(m => m.ManualVerificationModule) },
      {
        path: 'game-template',
        loadChildren: () => import('./views/pages/game-template/game-template.module').then(m => m.GameTemplateModule)
      },
      {
        path: 'flagged-game',
        loadChildren: () => import('./views/pages/flagged-game/flagged-game.module').then(m => m.FlaggedGameModule)
      },
      {
        path: 'consent',
        loadChildren: () => import('./views/pages/consent/consent.module').then(m => m.ConsentModule)
      },
      {
        path: 'social',
        loadChildren: () => import('./views/pages/social/social.module').then(m => m.SocialModule)
      },
      {
        path: 'privacy',
        loadChildren: () => import('./views/pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule)
      },
      {
        path: 'terms',
        loadChildren: () => import('./views/pages/terms/terms.module').then(m => m.TermsModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { 
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
 
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
