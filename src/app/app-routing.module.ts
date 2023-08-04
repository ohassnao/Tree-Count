import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './component/table/table.component';

import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/homepage/homepage.component';

const routes: Routes = [
  {path:'',component:HomePageComponent},
  {path:'login',component:LoginComponent},
  {path:'table', component:TableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
