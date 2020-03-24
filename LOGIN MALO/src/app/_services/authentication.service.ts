import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '@/_models';
import {UserService} from '../_services/user.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    private servicios :UserService;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username, passwordd) {
        console.log(username,passwordd);
        console.log(config.apiUrl);
        console.log('ESTOY LLEGANDO');
        const login={
            usuario:username,
            password:passwordd
        };

        /* console.log('login',login);
        const resp=this.http.post('http://localhost:3000/users/authenticate', login);
        console.log('RESPUESTA DEL METODO',resp);
        
        console.log('SALI YA'); */

        return this.http.post('http://localhost:3000/users/authenticate', login);
        }; /* this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username, password })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            })); */
    

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}