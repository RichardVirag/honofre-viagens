import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

    constructor(private auth: AuthService) { }

    ngOnInit() {
    }

    LoggedInUser = JSON.parse(this.auth.getLoggedUser()).current_user;

}
