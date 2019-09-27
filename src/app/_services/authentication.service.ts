import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    constructor(private http: HttpClient) {
        const user = localStorage.getItem('currentUser');
        if (user) {
            this._currentUser = JSON.parse(user);
        }
    }

    private _currentUser: User | undefined ;
    public get currentUser(): User | undefined  {
        return this._currentUser;
    }

    login(username: string, password: string) {
        const self = this;
        return this.http.post<User>(`${environment.apiBaseUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this._currentUser = user;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        this._currentUser = undefined;
        localStorage.removeItem('currentUser');
    }
}
