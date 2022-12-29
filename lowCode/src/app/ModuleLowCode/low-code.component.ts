import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { IItemBasic } from '../model/itembasic';
import { IAplication } from '../model/IAplication';
import { IServerResponse } from '../model/IServerResponse';
import { LowCodeService } from '../service/lowCode.service';
import { ItemAddComponent } from './itemadd/itemadd.component';
import {
  BasicPanelComponent,
  itemBasic
} from './leftnav/basicpanel/basicpanel.component';
import { LefNavComponent } from './leftnav/leftnav.component';

@Component({
  selector: 'low-code-root',
  templateUrl: './low-code.component.html',
  styleUrls: ['./low-code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LowCodeComponent implements OnInit {
  tabActive: boolean = false;
  index: number = 0;
  listItem: IItemBasic[] = [];
  selectItemIndex!: number;
  selectItem!: IItemBasic;
  isSelected: boolean = false;
  editpanel: string = '0px';
  @ViewChild(LefNavComponent) leftnav!: LefNavComponent;
  @ViewChildren(ItemAddComponent) items!: QueryList<ItemAddComponent>;

  constructor(
    private refCD: ChangeDetectorRef,
    private route: ActivatedRoute,
    private lowCodeService: LowCodeService
  ) {}

  ngOnInit(): void {
    this.lowCodeService
      .getAplication(this.route.snapshot.params['id'])
      .subscribe((response: IServerResponse<IAplication>) => {
        this.listItem = JSON.parse(response.returnValue.filds);
        this.refCD && this.refCD.detectChanges();
      });
  }

  saveListItem() {
    console.log(JSON.stringify(this.listItem));
    this.lowCodeService
      .saveAplication(
        this.route.snapshot.params['id'],
        JSON.stringify(this.listItem)
      )
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  ngOnChange() {
    // console.log(this.listItem);
  }

  ngAfterViewInit() {}

  public DragOver(event: any) {
    event.preventDefault();
    this.selectItemIndex = 0;
    this.isSelected = false;
    this.editpanel = '0px';
  }
  dropEmint() {
    let item: IItemBasic = {
      id: itemBasic.id + String(this.index),
      type: itemBasic.type,
      icon: itemBasic.icon,
      text: 'test',
      style: {
        borderBottom: 0,
        borderRight: 0,
        borderLeft: 0,
        borderTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        color: '#fff',
        background: '#0d6efd',
        borderColor: '#0d6efd'
      },
      subItem: []
    };
    this.listItem.push(item);
    console.log(this.listItem);
    this.index++;
  }

  dropItemCenter(index: number) {
    let item: IItemBasic = {
      id: itemBasic.id + String(this.index),
      type: itemBasic.type,
      icon: itemBasic.icon,
      text: 'test',
      style: {
        borderBottom: 0,
        borderRight: 0,
        borderLeft: 0,
        borderTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        color: '#fff',
        background: '#0d6efd',
        borderColor: '#0d6efd'
      },
      subItem: []
    };
    this.listItem.splice(index, 0, item);
    console.log(this.listItem);
    this.index++;
  }

  activeTab(tabActive: boolean) {
    this.tabActive = tabActive;
  }

  selectItemEvent(index: number) {
    this.selectItemIndex = index;
    this.selectItem = this.listItem[index];
    //console.log(this.selectItem);

    this.editpanel = '250px';
    this.isSelected = true;
    this.refCD && this.refCD.detectChanges();
  }

  closeEditPanel() {
    this.editpanel = '0px';
    this.isSelected = false;
  }
}
