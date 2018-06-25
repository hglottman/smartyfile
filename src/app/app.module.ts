import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { FileUnitComponent } from './file-unit/file-unit.component';
import { AllFilesComponent } from './all-files/all-files.component';

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    FileUnitComponent,
    AllFilesComponent
  ],
  imports: [
    BrowserModule,
    MatCardModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
