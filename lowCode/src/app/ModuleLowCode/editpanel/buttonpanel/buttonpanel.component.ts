import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IItemBasic } from 'src/app/model/itembasic';

@Component({
  selector: 'buttonpanel',
  templateUrl: './buttonpanel.component.html',
  styleUrls: ['./buttonpanel.component.scss']
})
export class ButtonPanelComponent implements OnInit {
  title: string = 'lowCode';
  @Input() item!: IItemBasic;


  constructor() {}

  ngOnInit(): void {
    console.log(this.item);
  }

  ngOnChanges() {
    console.log(this.item);
  }
}
