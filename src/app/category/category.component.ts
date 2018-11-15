import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    categories = null;
    userFilter: any = { title: '' };

    constructor(
        private api: ApiService
    ) { }

    ngOnInit() {
        this.api.getAllPrimaryCategories()
        .subscribe(
            data => {
                this.categories = data;
                for (let key in this.categories) {
                    this.hasSubcategories(this.categories[key].id, key);
                }
            }
        );
    }

    hasCategoriesToShow() {
        if(this.categories != null) {
            return true;
        }
        return false;
    }

    hasSubcategories(id, key) {
        this.api.getSubcategories(id)
        .subscribe(
            data => {
                this.categories[key].subcategories = data;
                console.log(this.categories);
            }
        );
    }

}
