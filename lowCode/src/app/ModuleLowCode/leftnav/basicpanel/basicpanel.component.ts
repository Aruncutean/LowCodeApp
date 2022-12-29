import { ChangeDetectorRef, Component } from '@angular/core';
import { IItemBasic } from 'src/app/model/itembasic';

export var itemBasic: IItemBasic;
@Component({
  selector: 'basicpanel-comp',
  templateUrl: './basicpanel.component.html',
  styleUrls: ['./basicpanel.component.scss']
})
export class BasicPanelComponent {
  private _basicElement: IItemBasic[] = [
    { id: 'buttonId', type: 'Button', icon: 'bi-phone-landscape',text:'Button',style:{},subItem:[]},
    { id: 'labelId', type: 'Label', icon: 'bi-fonts',style:{},subItem:[] },
    { id: 'inputId', type: 'Input', icon: 'bi-input-cursor-text' ,style:{},subItem:[]},
    { id: 'grid2Id', type: 'Grid2', icon: 'bi-layout-split',style:{},subItem:[] },
    { id: 'grid3Id', type: 'Grid3', icon: 'bi-layout-three-columns',style:{},subItem:[] },
    { id: 'toggleId', type: 'Toggle', icon: 'bi-toggle-on' ,style:{},subItem:[]},
    { id: 'textareaId', type: 'TextArea', icon: 'bi-textarea-resize',style:{},subItem:[] },
  ];
  public get basicElement(): IItemBasic[] {
    return this._basicElement;
  }
  public set basicElement(value: IItemBasic[]) {
    this._basicElement = value;
  }

  dragStart = false;

  constructor(private cdRef: ChangeDetectorRef) {}

  public dragsStart(item: IItemBasic) {
    console.log(item);
    this.dragStart = true;
    itemBasic = item;
    this.cdRef && this.cdRef.detectChanges();
  }
}
