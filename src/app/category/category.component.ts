import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../_services/auth.service';
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
    editCategory = JSON.parse('{"id":"","title":"","sequence":"","status_id":""}');

    categoryFilter: any = { title: '' };

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private api: ApiService
    ) {
        this.formCategory = fb.group({
            id: [''],
            title: ['', [Validators.required]],
            sequence: [''],
            status_id: ['', [Validators.required]],
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
            },
            res => {
                this.auth.isTokenValid(res['status']);
            }
        );
    }

    hasCategoriesToShow() {
        if(this.categories != null && this.categories.length > 0) {
            return true;
        }
        return false;
    }

    hasSubcategories(id, key) {
        this.api.getSubcategories(id)
        .subscribe(
            data => {
                this.categories[key].subcategories = data;
            },
            res => {
                this.auth.isTokenValid(res['status']);
            }
        );
    }

    addUpdateCategory() {
        if (this.formCategory.valid) {
            if(this.formCategory.value.sequence == "" ||
               this.formCategory.value.sequence == undefined) {
                this.formCategory.value.sequence = "null";
            }
            if(this.formCategory.value.type == 0) {
                this.formCategory.value.type = "null";
            }

            if(this.editCategory.id != "") {
                this.api.updateCategory(
                    this.formCategory.value.title,
                    this.formCategory.value.sequence,
                    this.formCategory.value.status_id,
                    this.formCategory.value.type,
                    this.editCategory.id
                ).subscribe(
                    res => {
                        this.auth.isTokenValid(res['status']);
                        this.getCategories();
                        this.editCategory = [];
                        this.formCategory.reset();
                    }
                );
            }
            else {
                this.api.insertCategory(
                    this.formCategory.value.title,
                    this.formCategory.value.sequence,
                    this.formCategory.value.status_id,
                    this.formCategory.value.type
                ).subscribe(
                    res => {
                        this.auth.isTokenValid(res['status']);
                        this.getCategories();
                        this.formCategory.reset();
                    }
                );
            }
            this.errorMsg = null;
        }
        else {
            this.errorMsg = "Preencha os campos corretamente"
        }
    }

    edit(id, parent_id) {
        this.errorMsg = null;
        if(parent_id == null) {
            this.editCategory = JSON.parse(JSON.stringify(this.categories.find(x=>x.id == id)));
            this.editCategory.type = 0;
        }
        else {
            var parent =  JSON.parse(JSON.stringify(this.categories.find(x=>x.id == parent_id)));
            this.editCategory = parent.subcategories.find(x=>x.id == id);
            this.editCategory.type = parent_id;
        }

        if(this.editCategory.status_id == "0") {
            this.editCategory.status_id = 0;
        }
        else {
            this.editCategory.status_id = 1;
        }
    }

    remove(id) {
        this.cancelEdition();
        if (confirm("Você tem certeza que quer excluir?")) {
            this.api.deleteCategory(id).subscribe(
                res => {
                    this.auth.isTokenValid(res['status']);
                    alert('Categoria removida com sucesso!');
                    this.getCategories();
                }
            );
        }
    }

    cancelEdition() {
        this.editCategory = JSON.parse('{"id":"","title":"","sequence":"","status_id":""}');
        this.errorMsg = null;
        this.formCategory.reset();
    }

}
