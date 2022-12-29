import { outputAst } from '@angular/compiler';
import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'dropzon-comp',
  templateUrl: './dropzon.component.html',
  styleUrls: ['./dropzon.component.scss']
})
export class DropZonComponent implements OnInit {
  @Output() dropEmint: EventEmitter<any> = new EventEmitter();
  @Input() isVisible: boolean = false;
  @Input() isGrird: boolean = false;
  constructor(private resolver: ComponentFactoryResolver) {}
  ngOnInit(): void {}

  public drop(event: any) {
    event.preventDefault();
    this.isVisible = false;
    this.dropEmint.emit();
  }

  public DragOver(event: any) {
    event.preventDefault();
  }

  dropenter(event: any) {
    if (!this.isGrird) {
      this.isVisible = true;
    }
  }

  dropleave(event: any) {
    if (!this.isGrird) {
      this.isVisible = false;
    }
  }
}
