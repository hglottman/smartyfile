import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Component} from '@angular/core';
import { FileUnitComponent } from './file-unit/file-unit.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatNativeDateModule} from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FolderService } from './folder.service';
import { AddfolderComponent } from './addfolder/addfolder.component';
import { DialogComponent } from './dialog/dialog.component';
import { FolderdialogComponent } from './folderdialog/folderdialog.component';
import { HeaderComponent } from './header/header.component';
import { FileUploadModule } from 'ng2-file-upload';



@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    LoginComponent,
    SignupComponent,
    FileUnitComponent,
    AllFilesComponent,
    AddfolderComponent,
    DialogComponent,
    FolderdialogComponent,
    HeaderComponent
  ],
  imports: [
    FileUploadModule,
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatCardModule,
    AppRoutingModule,
    MatIconModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  providers: [FolderService],
  bootstrap: [AppComponent],
  entryComponents: [SignupComponent, LoginComponent, DialogComponent]

})
export class AppModule { }
