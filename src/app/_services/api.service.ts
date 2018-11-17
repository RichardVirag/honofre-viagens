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

    /* Auth */

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

    /* Category */

    getAllPrimaryCategories() {
        return this.httpClient.get(this.apiUrl + '/categories/primary/all', {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    getSubcategories(id) {
        return this.httpClient.get(this.apiUrl + '/categories/sub/' + id, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    insertCategory(title, sequence, status, type) {
        return this.httpClient.post(this.apiUrl + '/categories/add',{
            "title":title,
            "sequence":sequence,
            "status":status,
            "type":type
        },{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    updateCategory(title, sequence, status, type, id) {
        return this.httpClient.post(this.apiUrl + '/categories/edit/' + id,{
            "title":title,
            "sequence":sequence,
            "status":status,
            "type":type
        },{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    deleteCategory(id) {
        return this.httpClient.delete(this.apiUrl + '/categories/remove/' + id,{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    /* Banner */

    getAllBanners() {
        return this.httpClient.get(this.apiUrl + '/banners/all', {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }
}
