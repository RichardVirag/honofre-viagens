import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(
        private httpClient:HttpClient
    ) { }

    apiUrl = "http://localhost:4500";

    userAuth(user, pass) {
        return this.httpClient.post(this.apiUrl + '/auth',{
            "username":user,
            "password":pass
        });
    }

    logout(user) {
        return this.httpClient.post(this.apiUrl + '/logout',{
            "username":user
        },
        {
            responseType: 'text',
            observe: 'response'
        });
    }

    getAllPrimaryCategories() {
        return this.httpClient.get(this.apiUrl + '/categories/primary/all', {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    getSubcategories() {
        return this.httpClient.get(//**/);
    }
}
