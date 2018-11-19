import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    formBanner;
    errorMsg = null;
    imageSrc = null;
    banners = null;
    editBanner = JSON.parse('{"id":"","url":"","new_window":"","status_id":"","sequence":"","alt":""}');

    hasUploadedFile = false;
    selectedFile;

    constructor(
        private fb: FormBuilder,
        private api: ApiService
    ) {
        this.formBanner = fb.group({
            id: [''],
            url: [''],
            new_window: [''],
            status_id: ['', [Validators.required]],
            sequence: [''],
            alt: [''],
            src: ['']
        });
    }

    ngOnInit() {
      this.getBanners();
    }

    getBanners() {
        this.api.getAllBanners()
        .subscribe(
            data => {
                this.banners = data;
            }
        );
    }

    hasBannersToShow() {
        if(this.banners != null && this.banners.length > 0) {
            return true;
        }
        return false;
    }

    previewImage(event: Event): void {
        if ((<HTMLInputElement>event.target).files && (<HTMLInputElement>event.target).files[0]) {
            this.selectedFile = (<HTMLInputElement>event.target).files[0];

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;

            reader.readAsDataURL(this.selectedFile);
            this.hasUploadedFile = true;
        }
    }

    addUpdateBanner() {
        if (this.formBanner.valid) {
            if(this.formBanner.value.sequence == "" ||
               this.formBanner.value.sequence == undefined) {
                this.formBanner.value.sequence = "null";
            }

            let uploadData = new FormData();

            uploadData.append('bannerImg', this.selectedFile);
            uploadData.append('url', this.formBanner.value.url);
            uploadData.append('new_window', this.formBanner.value.new_window);
            uploadData.append('status', this.formBanner.value.status_id);
            uploadData.append('sequence', this.formBanner.value.sequence);
            uploadData.append('alt', this.formBanner.value.alt);

            if (this.editBanner.id != "") {
                this.api.updateBanner(
                    uploadData, this.editBanner.id
                ).subscribe(
                    res => {
                        this.getBanners();
                        this.formBanner.reset();
                        this.imageSrc = null;
                    }
                );

                this.errorMsg = null;
            }
            else if (this.hasUploadedFile) {
                this.api.insertBanner(
                    uploadData
                ).subscribe(
                    res => {
                        this.getBanners();
                        this.formBanner.reset();
                        this.imageSrc = null;
                    }
                );

                this.errorMsg = null;
            }
            else {
                this.errorMsg = "Preencha os campos corretamente"
            }
        }
        else {
            this.errorMsg = "Preencha os campos corretamente"
        }
    }

    edit(id) {
        this.errorMsg = null;
        this.editBanner = JSON.parse(JSON.stringify(this.banners.find(x=>x.id == id)));

        if(this.editBanner.status == "Inativo") {
            this.editBanner.status_id = 0;
        }
        else {
            this.editBanner.status_id = 1;
        }

        if(this.editBanner.new_window == "0") {
            this.editBanner.new_window = 0;
        }
        else {
            this.editBanner.new_window = 1;
        }

        this.imageSrc = this.editBanner.src;
    }

    remove(id) {
        this.cancelEdition();
        if (confirm("Você tem certeza que quer excluir?")) {
            this.api.deleteBanner(id).subscribe(
                res => {
                    alert('Banner removido com sucesso!');
                    this.getBanners();
                }
            );
        }
    }

    cancelEdition() {
        this.editBanner = JSON.parse('{"id":"","url":"","new_window":"","status_id":"","sequence":"","alt":""}');
        this.errorMsg = null;
        this.imageSrc = null;
        this.formBanner.reset();
    }
}
