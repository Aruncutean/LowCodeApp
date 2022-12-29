import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAppModule } from './module_create_app/create-app.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CreateAppModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
