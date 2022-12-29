import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  isLogin: boolean = false;
  routerSubscription: Subscription | undefined;
  constructor(private router: Router) {
    if (sessionStorage.getItem('userInfo')) {
      this.isLogin = true;
    }
  }
  ngOnInit(): void {
    if (sessionStorage.getItem('userInfo')) {
      this.isLogin = true;
    }
  }

  ngOnChanges(){
    console.log("test")
    if (sessionStorage.getItem('userInfo')) {
      this.isLogin = true;
    }
  }

  ngAfterViewInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log("test")
        if (sessionStorage.getItem('userInfo')) {
          this.isLogin = true;
        }
      }
    });
  }

  loginPageNavigate() {
    this.router.navigate(['/auth']);
  }

  singUpPageNavigate() {
    this.router.navigate(['/auth/signup']);
  }

  logout() {
    sessionStorage.removeItem('userInfo');
    this.isLogin = false;
    this.router.navigate(['/auth']);
  }
}
