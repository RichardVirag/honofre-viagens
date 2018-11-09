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

    getAllCategories() {
        return this.httpClient.get(this.apiUrl + '/categories/all', {
            headers: new HttpHeaders().set('Authorization', '109781f090bbc7aa112c99be8dde8a13')
        });
    }
}
