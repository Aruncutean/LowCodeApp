import { Component, EventEmitter, Input, Output } from '@angular/core';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { IItemBasic } from 'src/app/model/itembasic';

@Component({
  selector: 'grid2-basic-comp',
  templateUrl: './grid2basic.component.html',
  styleUrls: ['./grid2basic.component.scss']
})
export class Grid2BasicComponent {
  @Input() item!: IItemBasic;

  @Output() isDropEvent: EventEmitter<string> = new EventEmitter();

  isDrop(poz: string) {
    this.isDropEvent.emit(poz);
  }

  isItem(type: string) {
    return this.item.subItem.filter(x => x.pos == type).length;
  }

  filterItemsOfType(type: string) {
    return this.item.subItem.filter(x => x.pos == type);
  }
}
