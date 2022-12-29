import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../config/apiMetadata';
import { IAuth } from '../model/IAuth';
import { IServerResponse } from '../model/IServerResponse';
import { catchError, map, Observable, Observer, tap, throwError } from 'rxjs';
import { IUserInfo } from '../model/IUserInfo';
import { IRegistration } from '../model/IRegistration';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  private get defaultHeaders() {
    return {};
  }

  login(auth: IAuth): Observable<IServerResponse<IUserInfo>> {
    return this.http
      .post<IServerResponse<IUserInfo>>(api.login, auth)
      .pipe(catchError(this.handleError));
  }

  register(auth: IAuth): Observable<IServerResponse<IRegistration>> {
    return this.http
      .post<IServerResponse<IRegistration>>(api.register, auth)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {

  
    if (error.error instanceof ErrorEvent) {
      console.log(error.error);
    } else {
      console.log(error.status);
    }
    return throwError('da');
  }
}
