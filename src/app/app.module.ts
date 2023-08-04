import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenubarComponent } from './component/menubar/menubar.component';
import { TableComponent } from './component/table/table.component';
import { HttpClientModule } from '@angular/common/http';
import { PopupComponent } from './component/popup/popup.component';
import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/homepage/homepage.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmationDialogComponent } from './component/confirmation-dialog/confirmation-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    TableComponent,
    PopupComponent,
    LoginComponent,
    HomePageComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
