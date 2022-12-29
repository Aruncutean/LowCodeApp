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
import { IAplication } from '../model/IAplication';
import { IPagination } from '../model/IPagination';
import { IAplicationCreate } from '../model/IAplicationCreate';
import { SessionStorageManagerService } from './sesion-storage-manager';

@Injectable()
export class AplicationService {
  constructor(
    private http: HttpClient,
    private ssm: SessionStorageManagerService
  ) {}

  getAplication(
    userId: string,
    page: number,
    pagesize: number
  ): Observable<IServerResponse<IPagination>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.ssm.getUserInfo().token
    });
    return this.http

      .get<IServerResponse<IPagination>>(api.getAplicationsByIdUser, {
        params: {
          idUser: userId,
          page: page,
          pageSize: pagesize
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

  addAplicatio(
    aplication: IAplicationCreate
  ): Observable<IServerResponse<IAplication>> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: 'Bearer ' + this.ssm.getUserInfo().token
    });

    return this.http
      .post<IServerResponse<IAplication>>(api.newAplication, aplication, {
        headers: httpHeaders
      })
      .pipe(
        catchError(
          (error: any, caught: Observable<any>): Observable<any> => {
            if (error.status == '401') {
              this.refresToken();
            }

            return of();
          }
        )
      );
  }

  handleError(error: any) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error);
    } else {
      console.log(error.status);
    }
    return throwError('da');
  }

  refresToken() {
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
