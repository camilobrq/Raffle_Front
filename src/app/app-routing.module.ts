import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ManagementServiceComponent} from 'src/app/Components/Services/management-service/management-service.component'
import {SearchServiceComponent} from 'src/app/Components/Services/search-service/search-service.component'
import {HomeComponent} from 'src/app/Components/Dashboard/home/home.component'
import {RegisterComponent} from 'src/app/Components/Login/register/register.component'
import {SignInComponent} from 'src/app/Components/Login/sign-in/sign-in.component'
import {DashboardComponent} from 'src/app/Components/Dashboard/dashboard/dashboard.component'
import { SearchProductComponent } from './Components/Product/search-product/search-product.component';
import { ManagementProductComponent } from './Components/Product/management-product/management-product.component';
const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent, children: [
    { path: 'Home', component: HomeComponent },
    { path: 'ManagementService', component: ManagementServiceComponent },
    { path: 'SearchService', component: SearchServiceComponent },
    { path: 'ManagementProduct', component: ManagementProductComponent },
    { path: 'SearchProduct', component: SearchProductComponent }
  ]},
  { path: '**', redirectTo: 'Dashboard' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
