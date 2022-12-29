import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

//Angular Material Component
import { MatTooltipModule } from '@angular/material/tooltip';
//My Component
import { LowCodeComponent } from './low-code.component';
import { LefNavComponent } from './leftnav/leftnav.component';
import { SharePanelComponent } from './leftnav/sharepanel/sharepanel.component';
import { MatCardModule } from '@angular/material/card';
import { BasicPanelComponent } from './leftnav/basicpanel/basicpanel.component';
import { DropZonComponent } from './dropzon/dropzon.component';
import { ButtonBasicComponent } from '../basicComponent/buttonbasic/buttonbasic.component';
import { ItemAddComponent } from './itemadd/itemadd.component';
import { InputBasicComponent } from '../basicComponent/inputbasic/inputbasic.component';
import { EditPanelComponent } from './editpanel/editpanel.component';
import { LowCodeService } from '../service/lowCode.service';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';
import { Grid2BasicComponent } from '../basicComponent/grid2basic/grid2basic.component';
import { Grid3BasicComponent } from '../basicComponent/grid3basic/grid3basic.component';
import { ToggelBasicComponent } from '../basicComponent/toggelbasic/toggelbasic.component';
import { TextAreaBasicComponent } from '../basicComponent/textareabasic/textareabasic.component';
import { ButtonPanelComponent } from './editpanel/buttonpanel/buttonpanel.component';
import { FormControl, FormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: LowCodeComponent
  }
];

@NgModule({
  declarations: [
    LowCodeComponent,
    LefNavComponent,
    SharePanelComponent,
    BasicPanelComponent,
    DropZonComponent,
    ButtonBasicComponent,
    ItemAddComponent,
    InputBasicComponent,
    EditPanelComponent,
    Grid2BasicComponent,
    Grid3BasicComponent,
    ToggelBasicComponent,
    TextAreaBasicComponent,
    ButtonPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTooltipModule,
    MatCardModule,

    FormsModule
  ],
  providers: [LowCodeService, SessionStorageManagerService],

  bootstrap: [LowCodeComponent]
})
export class LowCodeModule {}
