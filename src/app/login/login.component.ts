import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    form;
    errorMsg = null;
    constructor(
        private fb: FormBuilder,
        private myRoute: Router,
        private auth: AuthService,
        private api: ApiService
    ) {
        this.form = fb.group({
            login: ['', [Validators.required]],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
    }

    login() {
        if (this.form.valid) {
            this.api.userAuth(
                this.form.value.login,
                this.form.value.password
            )
            .subscribe(
                data => {
                    this.auth.sendToken(data);
                    this.myRoute.navigate([""]);
                },
                res => {
                    this.errorMsg = "Login ou senha inválido(s)"
                }
            );
        }
        else {
            this.errorMsg = "Preencha os campos para prosseguir"
        }
    }
}
