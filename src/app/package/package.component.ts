import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-package',
    templateUrl: './package.component.html',
    styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
    formPackage;

    showForm = false;
    showModal = false;
    errorMsg = null;

    packages = null;

    editPackage = JSON.parse('{"id":"","title":"","status_id":"","short_description":"","description":"","value":"","first_image":"","second_image":"","third_image":"","fourth_image":""}');
    categoriesToSelect = null;

    packageFilter: any = { title: '' };

    hasUploadedFile = false;
    imagesSrc = [];
    selectedFiles = [];
    selectedCategories = [];

    constructor(
        private fb: FormBuilder,
        private api: ApiService
    ) {
        this.formPackage = fb.group({
            id: [''],
            title: ['', [Validators.required]],
            status_id: ['', [Validators.required]],
            short_description: ['', [Validators.required]],
            description: ['', [Validators.required]],
            value: ['', [Validators.required]],
            src: [''],
        });

        this.imagesSrc[0] = undefined;
        this.imagesSrc[1] = undefined;
        this.imagesSrc[2] = undefined;
        this.imagesSrc[3] = undefined;
    }

    ngOnInit() {
        this.getPackages();
        this.getCategoriesToSelect();
    }

    getPackages() {
        this.api.getAllPackages()
        .subscribe(
            data => {
                this.packages = data;
            }
        );
    }

    hasPackagesToShow() {
        if(this.packages != null && this.packages.length > 0) {
            return true;
        }
        return false;
    }

    newPackage() {
        this.showForm = !this.showForm;
    }

    categoriesModal() {
        this.showModal = !this.showModal;
    }

    getCategoriesToSelect() {
        this.api.getAllCategories()
        .subscribe(
            data => {
                this.categoriesToSelect = data;
            }
        );
    }

    selectCategory(category) {
        this.selectedCategories.push(category);
        this.categoriesToSelect.splice(
            this.categoriesToSelect.indexOf(category), 1
        );
    }

    removeSelectedCategory(selcategory) {
        this.categoriesToSelect.push(selcategory);
        this.selectedCategories.splice(
            this.selectedCategories.indexOf(selcategory), 1
        );
    }

    addUpdatePackage() {
        if (this.formPackage.valid) {
            this.errorMsg = null;
        }
        else {
            this.errorMsg = "Preencha os campos corretamente";
            document.getElementById('top').scrollIntoView();
        }
    }

    cancel() {
        this.errorMsg = null;
        this.formPackage.reset();
        this.newPackage();
    }

}
