import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Headers, RequestOptions } from '@angular/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { User, users } from './user-models';

@Injectable()
export class UserService {
  private baseUrl = 'api/users';

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.httpClient
      .get<User[]>(this.baseUrl)
      .pipe(catchError(this.handleError('getUsers', [])));
  }

  getUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient
      .get<User>(url)
      .pipe(catchError(this.handleError<User>(`getUserById id=${id}`)));
  }

  createUser(user: FormData): Observable<User> {
    return this.httpClient
      .post<User>(this.baseUrl, user)
      .pipe(catchError(this.handleError<User>(`createUser`)));
  }

  updateUser(user: FormData): Observable<User> {
    const url = `${this.baseUrl}/${user.get('id')}`;
    return this.httpClient
      .put<User>(url, user)
      .pipe(catchError(this.handleError<User>(`updateUser`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
