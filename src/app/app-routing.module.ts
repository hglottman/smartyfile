import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './folder/folder.component';
import {LoginComponent} from './login/login.component'
import { AllFilesComponent } from './all-files/all-files.component';

const routes: Routes = [
  { path: 'folder', component: FolderComponent},
   { path: 'folder/file/:id', component: AllFilesComponent },
  { path: '', component: LoginComponent},  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
