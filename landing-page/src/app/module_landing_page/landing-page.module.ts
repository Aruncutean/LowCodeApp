import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';

//Angular Material Component


//My Component
import { LandingPageComponent } from './landing-page.component';
export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  }
];

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ],
  providers: [SessionStorageManagerService],

  bootstrap: [LandingPageComponent]
})
export class LandingPageModule {}
