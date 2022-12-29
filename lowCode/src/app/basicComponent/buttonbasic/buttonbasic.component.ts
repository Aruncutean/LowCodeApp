import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { IItemBasic } from 'src/app/model/itembasic';

@Component({
  selector: 'button-basic-comp',
  templateUrl: './buttonbasic.component.html',
  styleUrls: ['./buttonbasic.component.scss']
})
export class ButtonBasicComponent {
  @Input() item!: IItemBasic;
}
