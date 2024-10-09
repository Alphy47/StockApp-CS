import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExceluploadComponent } from './pages/excelupload/excelupload.component';

import { UserhandleComponent } from './pages/userhandle/userhandle.component';
import { DashboardviewComponent } from './pages/dashboardview/dashboardview.component';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent}, 
  {path:'excelupload',component:ExceluploadComponent}, 
  {path:'dashboard',component:DashboardviewComponent}, 
  {path:'userhandle',component:UserhandleComponent}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
