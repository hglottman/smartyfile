import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './folder/folder.component';

const routes: Routes = [
  { path: '', component: FolderComponent},
  // { path: '', component:  } add here you login page as a route.
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
