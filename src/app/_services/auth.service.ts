import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private myRoute: Router) { }
    sendToken(data) {
        localStorage.setItem("LoggedInUser", JSON.stringify(data))
    }
    getLoggedUser() {
        return localStorage.getItem("LoggedInUser")
    }
    isLoggednIn() {
        return this.getLoggedUser() !== null;
    }
    logout() {
        localStorage.removeItem("LoggedInUser");
        this.myRoute.navigate(["login"]);
    }
}
