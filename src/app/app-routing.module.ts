import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { PackageComponent } from './package/package.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    {
       path: '',
       component: DashboardComponent,
       pathMatch: 'full',
       canActivate: [AuthGuard]
    },
    {
       path: 'login',
       component: LoginComponent
    },
    {
       path: 'banners',
       component: BannerComponent,
       canActivate: [AuthGuard]
    },
    {
       path: 'categorias',
       component: CategoryComponent,
       canActivate: [AuthGuard]
    },
    {
       path: 'pacotes',
       component: PackageComponent,
       canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
