import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
    imageSrc = null;
    banners = null;

    constructor(
        private api: ApiService
    ) { }

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
            const file = (<HTMLInputElement>event.target).files[0];

            const reader = new FileReader();
            reader.onload = e => this.imageSrc = reader.result;

            reader.readAsDataURL(file);
        }
    }
}
