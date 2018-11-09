import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categories = null
    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.api.getAllCategories()
        .subscribe(
            data => {
                this.categories = data;
            }
        );
    }

    hasCategoriesToShow() {
        if(this.categories != null) {
            return true;
        }
        return false;
    }

}
