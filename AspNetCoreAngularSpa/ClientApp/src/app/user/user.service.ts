import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

import { User, users } from './user-models';

@Injectable()
export class UserService {
    private baseUrl = 'api/users';

    constructor(private http: Http) { }

    getUsers(): Observable<User[]> {
        return this.http.get(this.baseUrl)
            .map(response => response.json())
    }

    getUserById(id: number): Observable<User> {
        const url = `${this.baseUrl}/${id}`;
        return this.http.get(url)
            .map(response => response.json());
    }

    createUser(user: FormData): Observable<User> {
        return this.http.post(this.baseUrl, user)
            .map(response => response.json())
    }

    updateUser(user: FormData): Observable<User> {
        const url = `${this.baseUrl}/${user.get("id")}`;
        return this.http.put(url, user)
            .map(response => response.json());
    }
}