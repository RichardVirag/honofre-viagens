import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ApiService } from '../_services/api.service';
import { Md5 } from 'ts-md5/dist/md5';

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
        const md5 = new Md5();
        if (this.form.valid) {
            this.api.userAuth(
                this.form.value.login,
                md5.appendStr(this.form.value.password).end()
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
