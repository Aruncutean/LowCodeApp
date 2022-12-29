import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('landingPage/Module').then(m => m.LandingPageModule),
    pathMatch: 'full'
  },
  {
    path: 'lowCode/:id',
    loadChildren: () => import('lowCode/Module').then(m => m.LowCodeModule),
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('auth/Module').then(m => m.AuthModule)
  },
  {
    path: 'cretea_app',
    loadChildren: () => import('createApp/Module').then(m => m.CreateAppModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
