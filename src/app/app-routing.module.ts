import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PackageComponent } from './package/package.component';

const routes: Routes = [
    {
       path: '',
       component: DashboardComponent
    },
    {
       path: 'login',
       component: LoginComponent
    },
    {
       path: 'banners',
       component: BannerComponent
    },
    {
       path: 'categorias',
       component: CategoryComponent
    },
    {
       path: 'pacotes',
       component: PackageComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
