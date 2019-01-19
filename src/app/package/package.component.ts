import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';
import { ChangeDetectorRef } from "@angular/core";

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
    selectedCategories = [];

    addedPackageId = 0;

    constructor(
        private fb: FormBuilder,
        private auth: AuthService,
        private api: ApiService,
        private cdRef: ChangeDetectorRef
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
    }

    ngOnInit() {
        this.getPackages();
        this.getCategoriesToSelect();

        if(this.editPackage.id == "") {
            this.resetImageSrc();
        }
    }

    resetImageSrc() {
        this.imagesSrc[0] = JSON.parse('{"src":""}');
        this.imagesSrc[1] = JSON.parse('{"src":""}');
        this.imagesSrc[2] = JSON.parse('{"src":""}');
        this.imagesSrc[3] = JSON.parse('{"src":""}');
    }

    getPackages() {
        this.api.getAllPackage()
        .subscribe(
            data => {
                this.packages = data;
                this.cdRef.detectChanges();
            },
            res => {
                this.auth.isTokenValid(res['status']);
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
        this.getCategoriesToSelect();
    }

    edit(id) {
        this.editPackage = JSON.parse(JSON.stringify(this.packages.find(x=>x.id == id)));

        if(this.editPackage.status == "Inativo") {
            this.editPackage.status_id = 0;
        }
        else {
            this.editPackage.status_id = 1;
        }

        this.api.getPackagesExtraInfo(id)
        .subscribe(
            data => {
                this.editPackage.short_description = data['short_description'];
                this.editPackage.description = data['description'];

                this.selectEditCategories(data['categories']);
                this.selectEditImages(data['images']);
            },
            res => {
                this.auth.isTokenValid(res['status']);
            }
        );
        this.cdRef.detectChanges();
        this.showForm = !this.showForm;
    }

    selectEditCategories(data) {
        this.selectedCategories = [];
        data.forEach(function (selectedcategory) {
            this.categoriesToSelect.forEach(function (category) {
                if(category.id == selectedcategory.id) {
                    this.selectCategory(category);
                }
            }.bind(this));
        }.bind(this));
    }

    selectEditImages(data) {
        this.resetImageSrc();
        data.forEach(function (image) {
            this.imagesSrc[image.sequence - 1].src = image.src;
        }.bind(this));
    }

    categoriesModal() {
        this.showModal = !this.showModal;
    }

    getCategoriesToSelect() {
        this.api.getAllCategories()
        .subscribe(
            data => {
                this.categoriesToSelect = data;
            },
            res => {
                this.auth.isTokenValid(res['status']);
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

    deleteImage(index) {
        this.imagesSrc[index] = JSON.parse('{"src":""}');
        this.cdRef.detectChanges();
    }

    previewImage(event: Event, index): void {
        if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
            this.imagesSrc[index].file = (<HTMLInputElement>event.target).files[0];

            const reader = new FileReader();
            reader.onload = e => this.imagesSrc[index].src = reader.result;

            reader.readAsDataURL(this.imagesSrc[index].file);
        }
    }

    addUpdatePackage() {
        if (this.formPackage.valid) {
            if(this.selectedCategories.length === 0) {
                this.errorMsg = "Selecione ao menos uma categoria para prosseguir";
                document.getElementById('top').scrollIntoView();
            }
            else if(this.editPackage.id != "") {
                this.api.updatePackage(
                    this.formPackage.value.title,
                    this.formPackage.value.status_id,
                    this.formPackage.value.short_description,
                    this.formPackage.value.description,
                    this.formPackage.value.value,
                    this.editPackage.id
                ).subscribe(
                    res => {
                        this.auth.isTokenValid(res['status']);
                        var key = 0;
                        this.imagesSrc.forEach(function (img) {
                            console.log(img);
                            let uploadData = new FormData();
                            uploadData.append('packageImage',img.file);
                            uploadData.append('src', img.src);
                            uploadData.append('sequence', (key + 1).toString());

                            key++;

                            this.api.editImagePackage(
                                uploadData, this.editPackage.id
                            ).subscribe(
                                res => {
                                    this.auth.isTokenValid(res['status']);
                                }
                            );
                        }.bind(this));
                    }
                );


                this.api.editCategoriesPackage(
                    this.selectedCategories,
                    this.editPackage.id
                ).subscribe(
                    res => {
                        this.auth.isTokenValid(res['status']);
                        this.showForm = false;
                        this.resetImageSrc();
                        this.selectedCategories = [];
                        this.getCategoriesToSelect();
                        this.formPackage.reset();
                        this.getPackages();

                        this.errorMsg = null;
                        this.cdRef.detectChanges();
                    }
                );
            }
            else {
                this.api.insertPackage(
                    this.formPackage.value.title,
                    this.formPackage.value.status_id,
                    this.formPackage.value.short_description,
                    this.formPackage.value.description,
                    this.formPackage.value.value
                ).subscribe(
                    data => {
                        this.addedPackageId = data[0].id;

                        for (let key in this.imagesSrc) {
                            if(this.imagesSrc[key].src != "") {

                                let uploadData = new FormData();
                                uploadData.append('packageImage', this.imagesSrc[key].file);
                                uploadData.append('id', this.addedPackageId.toString());
                                uploadData.append('sequence', (parseInt(key) + 1).toString());

                                this.api.insertImagePackage(
                                    uploadData
                                ).subscribe(
                                    res => {
                                        this.auth.isTokenValid(res['status']);
                                    }
                                );
                            }
                        }

                        this.api.insertCategoriesPackage(
                            this.selectedCategories,
                            this.addedPackageId.toString()
                        ).subscribe(
                            res => {
                                this.auth.isTokenValid(res['status']);
                            }
                        );

                        this.showForm = false;
                        this.resetImageSrc();
                        this.selectedCategories = [];
                        this.formPackage.reset();
                        this.getPackages();
                    },
                    res => {
                        this.auth.isTokenValid(res['status']);
                    }
                );

                this.errorMsg = null;
            }
        }
        else {
            this.errorMsg = "Preencha os campos corretamente";
            document.getElementById('top').scrollIntoView();
        }
    }

    remove(id) {
        if (confirm("Você tem certeza que quer excluir?")) {
            this.api.deletePackage(id).subscribe(
                res => {
                    this.auth.isTokenValid(res['status']);
                    alert('Pacote removido com sucesso!');
                    this.getPackages();
                }
            );
        }
    }

    cancel() {
        this.errorMsg = null;
        this.formPackage.reset();
        this.selectedCategories = [];
        this.resetImageSrc();
        this.newPackage();
    }

}
