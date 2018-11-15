import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
    formCategory;
    errorMsg = null;
    categories = null;
    userFilter: any = { title: '' };

    constructor(
        private fb: FormBuilder,
        private api: ApiService
    ) {
        this.formCategory = fb.group({
            title: ['', [Validators.required]],
            sequence: [''],
            status: ['', [Validators.required]],
            type: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.getCategories();
    }

    getCategories() {
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
            }
        );
    }

    addCategory() {
        if (this.formCategory.valid) {
            if(this.formCategory.value.sequence == "") {
                this.formCategory.value.sequence = "null";
            }
            this.api.insertCategory(
                this.formCategory.value.title,
                this.formCategory.value.sequence,
                this.formCategory.value.status,
                this.formCategory.value.type
            ).subscribe(
              res => {
                  this.getCategories();
                  this.formCategory.reset();
              }
            );
            this.errorMsg = null;
        }
        else {
            this.errorMsg = "Preencha os campos corretamente"
        }
    }

}
