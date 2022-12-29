import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IAuth } from '../model/IAuth';
import { IServerResponse } from '../model/IServerResponse';
import { AuthService } from '../service/auth.service';
import { Validators } from '@angular/forms';
import { SessionStorageManagerService } from '../service/sesion-storage-manager';
import { IUserInfo } from '../model/IUserInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'auth-root',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent {
  loadingIndicator: boolean = false;
  alertIsShow = false;
  errorMassage!: string;

  authFormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ])
  });

  get email() {
    return this.authFormGroup.get('email');
  }

  get password() {
    return this.authFormGroup.get('password');
  }

  constructor(
    private authService: AuthService,
    private refCD: ChangeDetectorRef,
    private ssm: SessionStorageManagerService,
    private router: Router
  ) {}

  login() {
    if (this.authFormGroup.valid) {
      this.loadingIndicator = true;

      this.authService
        .login({
          email: String(this.authFormGroup.value.email),
          password: String(this.authFormGroup.value.password)
        })
        .subscribe((data: IServerResponse<IUserInfo>) => {
          if (data.returnValue) {
            this.ssm.setUserInfo(data.returnValue);
            this.refCD && this.refCD.detectChanges();
            this.router.navigate(['']);
          } else {
            this.alertIsShow = true;
            this.errorMassage = data.errorMessage;
          }
          this.loadingIndicator = false;
          
          this.refCD && this.refCD.detectChanges();
        });
    } else {
      this.alertIsShow = true;
      this.errorMassage = 'Complete all the fields';
    }
  }
}
