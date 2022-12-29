import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, Observer, tap } from 'rxjs';
import { IUserInfo } from '../model/IUserInfo';

@Injectable()
export class SessionStorageManagerService {
  constructor() {}

  public setUserInfo(userInfo: IUserInfo) {
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  public getUserInfo(): IUserInfo {
    return JSON.parse(String(sessionStorage.getItem('userInfo')));
  }
}
