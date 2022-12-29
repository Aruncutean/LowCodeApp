import {
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ButtonBasicComponent } from 'src/app/basicComponent/buttonbasic/buttonbasic.component';
import { Grid2BasicComponent } from 'src/app/basicComponent/grid2basic/grid2basic.component';
import { Grid3BasicComponent } from 'src/app/basicComponent/grid3basic/grid3basic.component';
import { InputBasicComponent } from 'src/app/basicComponent/inputbasic/inputbasic.component';
import { LabelBasicComponent } from 'src/app/basicComponent/labelbasic/labelbasic.component';
import { TextAreaBasicComponent } from 'src/app/basicComponent/textareabasic/textareabasic.component';
import { ToggelBasicComponent } from 'src/app/basicComponent/toggelbasic/toggelbasic.component';
import { IItemBasic } from 'src/app/model/itembasic';
import { itemBasic } from '../leftnav/basicpanel/basicpanel.component';

@Component({
  selector: 'itemadd-comp',
  templateUrl: './itemadd.component.html',
  styleUrls: ['./itemadd.component.scss']
})
export class ItemAddComponent implements OnInit {
  @ViewChild('dropItem', { read: ViewContainerRef })
  dropItem!: ViewContainerRef;
  itemSelected: boolean = false;
  @Input() itemBasic!: IItemBasic;
  itemAdd!: ComponentRef<any>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {}
  ngAfterViewInit() {
    this.switchItem(this.itemBasic.type);
  }

  switchItem(type: string) {
    let compFactory;
    switch (type) {
      case 'Button': {
        this.itemAdd = this.addItem<ButtonBasicComponent>(ButtonBasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        break;
      }
      case 'Label': {
        this.itemAdd = this.addItem<LabelBasicComponent>(LabelBasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        break;
      }
      case 'Input': {
        this.itemAdd = this.addItem<InputBasicComponent>(InputBasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        break;
      }
      case 'Grid2': {
        this.itemAdd = this.addItem<Grid2BasicComponent>(Grid2BasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        this.itemAdd.instance.isDropEvent.subscribe((response: string) => {
          let item: IItemBasic = {
            id: itemBasic.id + String(this.itemBasic.subItem.length),
            type: itemBasic.type,
            icon: itemBasic.icon,
            text: 'test',
            pos: response,
            style: {},
            subItem: []
          };
          this.itemBasic.subItem.push(item);
        });
        break;
      }
      case 'Grid3': {
        this.itemAdd = this.addItem<Grid3BasicComponent>(Grid3BasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        this.itemAdd.instance.isDropEvent.subscribe((response: string) => {
          let item: IItemBasic = {
            id: itemBasic.id + String(this.itemBasic.subItem.length),
            type: itemBasic.type,
            icon: itemBasic.icon,
            text: 'test',
            pos: response,
            style: {},
            subItem: []
          };
          this.itemBasic.subItem.push(item);
        });
        break;
      }
      case 'Toggle': {
        this.itemAdd = this.addItem<ToggelBasicComponent>(ToggelBasicComponent);
        this.itemAdd.instance.item = this.itemBasic;
        break;
      }
      case 'TextArea': {
        this.itemAdd = this.addItem<TextAreaBasicComponent>(
          TextAreaBasicComponent
        );
        this.itemAdd.instance.item = this.itemBasic;
        break;
      }
      default:
        console.error('Item is not in list!!');
    }
    this.cdref && this.cdref.detectChanges();
  }

  addItem<T>(item: any): ComponentRef<T> {
    return this.dropItem.createComponent(
      this.resolver.resolveComponentFactory<T>(item) as any
    );
  }
}
