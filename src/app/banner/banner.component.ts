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
        if(this.banners != null) {
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
            if (this.hasUploadedFile) {
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
}
