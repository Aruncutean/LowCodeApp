import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import * as saveAs from 'file-saver';
import * as JSZip from 'jszip';
import { IItemBasic } from 'src/app/model/itembasic';
import { BasicPanelComponent } from './basicpanel/basicpanel.component';


@Component({
  selector: 'leftnav-comp',
  templateUrl: './leftnav.component.html',
  styleUrls: ['./leftnav.component.scss']
})
export class LefNavComponent {
  @Output() activeTabEmit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild(BasicPanelComponent) basicPanelComponent!: BasicPanelComponent;
  

  @Input() listItem: IItemBasic[] = [];
  tabIndexActive = 0;
  activeLefBar: boolean = false;
  activeTab(index: number) {
    if (index == this.tabIndexActive) {
      this.tabIndexActive = 0;
      this.activeLefBar = false;
    } else {
      this.tabIndexActive = index;
      this.activeLefBar = true;
    }

    this.activeTabEmit.emit(this.activeLefBar);
  }

  download = async () => {
    const zip = new JSZip();

    let c =
      '<!DOCTYPE html>' +
      '<html>' +
      '  <head>' +
      " <meta charset='utf-8'>" +
      "  <meta http-equiv='X-UA-Compatible' content='IE=edge'>" +
      '<title>Page Title</title>' +
      "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
      "<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css' integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T' crossorigin='anonymous'>" +
      '</head>' +
      '<body>';

    for (let i of this.listItem) {
      if (i.type == 'Button') {
        c = c + "<div><button class='btn btn-primary'>"+i.text+"</button><div>";
      } else if (i.type == 'Label') {
        c = c + '<div><label>Test</label><div>';
      } else if (i.type == 'Input') {
        c = c + "<div><input type='text'><div>";
      }
    }

    c = c + '</body>' + '</html>';
    zip.file('hello.html', c);

    zip.generateAsync({ type: 'blob' }).then(function(content: any) {
      saveAs(content, 'example.zip');
    });
  };
}
