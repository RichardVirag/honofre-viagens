import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient:HttpClient) { }

    apiUrl = "http://localhost:4500/";

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
}
