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
        return this.httpClient.post(this.apiUrl + '/auth', {
            "username":user,
            "password":pass
        });
    }

    logout(user) {
        return this.httpClient.post(this.apiUrl + '/logout', {
            "username":user
        },
        {
            responseType: 'text',
            observe: 'response'
        });
    }

    /* Category */

    getAllCategories() {
        return this.httpClient.get(this.apiUrl + '/categories/all', {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

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
        return this.httpClient.post(this.apiUrl + '/categories/add', {
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
        return this.httpClient.post(this.apiUrl + '/categories/edit/' + id, {
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
        return this.httpClient.delete(this.apiUrl + '/categories/remove/' + id, {
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

    insertBanner(uploadData) {
        return this.httpClient.post(this.apiUrl + '/banners/add', uploadData, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    updateBanner(uploadData, id) {
        return this.httpClient.post(this.apiUrl + '/banners/edit/' + id, uploadData, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    deleteBanner(id) {
        return this.httpClient.delete(this.apiUrl + '/banners/remove/' + id,{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    /* Packages */

    getAllPackage() {
        return this.httpClient.get(this.apiUrl + '/packages/all', {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    insertPackage(title, status, short_description, description, value) {
        return this.httpClient.post(this.apiUrl + '/packages/add',{
            "title":title,
            "status":status,
            "short_description":short_description,
            "description":description,
            "value":value
        },{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    insertImagePackage(uploadData) {
        return this.httpClient.post(this.apiUrl + '/packages/image/add', uploadData, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    insertCategoriesPackage(selectedCategories, id) {
        return this.httpClient.post(this.apiUrl + '/packages/categories/add/' + id, selectedCategories, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    updatePackage(title, status, short_description, description, value, id) {
        return this.httpClient.post(this.apiUrl + '/packages/edit/' + id,{
            "title":title,
            "status":status,
            "short_description":short_description,
            "description":description,
            "value":value
        },{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    deletePackage(id) {
        return this.httpClient.delete(this.apiUrl + '/packages/remove/' + id,{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    getPackagesExtraInfo(id) {
        return this.httpClient.get(this.apiUrl + '/packages/extrainfo/' + id,{
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    editImagePackage(uploadData, id) {
        return this.httpClient.post(this.apiUrl + '/packages/image/edit/' + id, uploadData, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }

    editCategoriesPackage(selectedCategories, id) {
        return this.httpClient.post(this.apiUrl + '/packages/categories/update/' + id, selectedCategories, {
            headers: new HttpHeaders().set('Authorization',
            JSON.parse(localStorage.getItem("LoggedInUser")).token)
        });
    }
}
