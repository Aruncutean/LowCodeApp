import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';

@Component({
  selector: 'landing-page-root',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent implements OnInit {
  isLogin: boolean = false;

  constructor(
    private router: Router,
    private ssm: SessionStorageManagerService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('userInfo')) {
      this.isLogin = true;
    }
  }

  loginNavigate(){
    this.router.navigate(['auth']);
  }
  appPagisNavigate() {
    this.router.navigate(['cretea_app']);
  }
}
