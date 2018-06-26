import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { FolderComponent } from './folder/folder.component';
import { FileUnitComponent } from './file-unit/file-unit.component';
import { AllFilesComponent } from './all-files/all-files.component';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FolderService } from './folder.service';
import { AddfolderComponent } from './addfolder/addfolder.component';
import { DialogComponent } from './dialog/dialog.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';



@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    FileUnitComponent,
    AllFilesComponent,
    AddfolderComponent,
    DialogComponent,
    UploadFilesComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    MatToolbarModule,
    AppRoutingModule
  ],
  providers: [FolderService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent]
})
export class AppModule { }
