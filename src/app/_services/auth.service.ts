import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../_services/api.service';
import {Observable} from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(
        private myRoute: Router,
        private api: ApiService
    ) {}

    sendToken(data) {
        localStorage.setItem("LoggedInUser", JSON.stringify(data))
    }
    getLoggedUser() {
        return localStorage.getItem("LoggedInUser")
    }
    isLoggednIn() {
        return this.getLoggedUser() !== null;
    }
    logout(LoggedInUser) {
        this.api.logout(LoggedInUser)
        .subscribe((res) => {
            if(res.status) {
                localStorage.removeItem("LoggedInUser");
                this.myRoute.navigate(["login"]);
            }
        }
    }
}
