import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LowCodeComponent } from './ModuleLowCode/low-code.component';
import { LowCodeModule } from './ModuleLowCode/low-code.module';
import { LowCodeService } from './service/lowCode.service';
import { SessionStorageManagerService } from './service/sesion-storage-manager';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, LowCodeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
