import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { api } from '../config/apiMetadata';

import { IServerResponse } from '../model/IServerResponse';
import {
  catchError,
  map,
  Observable,
  Observer,
  of,
  tap,
  throwError
} from 'rxjs';
import { IUserInfo } from '../model/IUserInfo';

import { SessionStorageManagerService } from './sesion-storage-manager';
import { IAplication } from '../model/IAplication';

@Injectable()
export class LowCodeService {
  constructor(
    private http: HttpClient,
    private ssm: SessionStorageManagerService
  ) {}

  getAplication(
    idAplication: string
  ): Observable<IServerResponse<IAplication>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.ssm.getUserInfo().token
    });
    return this.http
      .get<IServerResponse<IAplication>>(api.GetAplication, {
        params: {
          idAplication: idAplication
        },
        headers: httpHeaders
      })
      .pipe(
        catchError(
          (error: any): Observable<any> => {
            if (error.status == '401') {
              this.refresToken();
            }
            return of();
          }
        )
      );
  }

  saveAplication(
    idAplication: string,
    filds: string
  ): Observable<IServerResponse<string>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.ssm.getUserInfo().token
    });
    return this.http
      .post<IServerResponse<string>>(
        api.saveAplication,
        {
          filds: filds,
          idAplication: idAplication
        },
        {
          headers: httpHeaders
        }
      )
      .pipe(
        catchError(
          (error: any): Observable<any> => {
            if (error.status == '401') {
              this.refresToken();
            }
            return of();
          }
        )
      );
  }

  private refresToken() {
    this.http
      .post<IServerResponse<string>>(api.refreshToken, {
        id: this.ssm.getUserInfo().id,
        token: this.ssm.getUserInfo().token
      })
      .pipe(
        catchError(
          (error: any): Observable<any> => {
            return of();
          }
        )
      )
      .subscribe((response: IServerResponse<string>) => {
        return this.ssm.setUserInfo({
          id: this.ssm.getUserInfo().id,
          email: this.ssm.getUserInfo().email,
          name: this.ssm.getUserInfo().name,
          token: response.returnValue,
          refreshTokens: this.ssm.getUserInfo().refreshTokens
        });
      });
  }
}
