import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';

//Angular Material Component

//My Component
import { AuthComponent } from './auth.component';
import { SignUpComponent } from './singup/singup.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
];

@NgModule({
  declarations: [SignUpComponent, AuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, SessionStorageManagerService],

  bootstrap: [AuthComponent]
})
export class AuthModule {}
