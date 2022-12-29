import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    QueryList,
    ViewChild,
    ViewChildren
  } from '@angular/core';
 
  @Component({
    selector: 'singup-root',
    templateUrl: './singup.component.html',
    styleUrls: ['./singup.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class SignUpComponent {
 
  }
  