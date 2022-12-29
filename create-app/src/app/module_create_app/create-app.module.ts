import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AplicationService } from '../service/aplication.service';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';

//Angular Material Component

//My Component
import { CreateAppComponent } from './create-app.component';
import { CreateAppPopapComponent } from './create_aplication/create-app-popap.component';

export const routes: Routes = [
  {
    path: '',
    component: CreateAppComponent
  }
];

@NgModule({
  declarations: [CreateAppComponent, CreateAppPopapComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SessionStorageManagerService, AplicationService],

  bootstrap: [CreateAppComponent]
})
export class CreateAppModule {}
