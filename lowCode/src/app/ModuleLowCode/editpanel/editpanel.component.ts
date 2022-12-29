import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { IItemBasic } from 'src/app/model/itembasic';
import { ButtonPanelComponent } from './buttonpanel/buttonpanel.component';

@Component({
  selector: 'editpanel-comp',
  templateUrl: './editpanel.component.html',
  styleUrls: ['./editpanel.component.scss']
})
export class EditPanelComponent {
  title: string = 'lowCode';
  @Input() isSelected: boolean = false;
  @Input() item!: IItemBasic;
  @Output() closeEditPanelOut: EventEmitter<any> = new EventEmitter();
  @Output() emitChange: EventEmitter<IItemBasic> = new EventEmitter<
    IItemBasic
  >();
  @ViewChild('panel', { read: ViewContainerRef })
  panel!: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}
  ngOnChanges() {
    this.panel?.clear();
    if (this.item?.type == 'Button') {
      const item = this.panel?.createComponent(
        this.resolver.resolveComponentFactory(ButtonPanelComponent)
      );
      item.instance.item = this.item;
    }
  }

  closeEditPanel() {
    this.isSelected = false;
    this.closeEditPanelOut.emit();
  }
}
