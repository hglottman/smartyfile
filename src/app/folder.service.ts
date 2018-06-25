import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscriber } from 'rxjs';
import { File } from './file';
import { Folder } from './folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  allFolders: Array<Folder>;
  allFoldersSubject: Subject<Folder[]> = new Subject<Folder[]>();
  allFoldersObservable: Observable<Folder[]>;

  allFiles: Array<File>;
  allFilesSubject: Subject<File[]> = new Subject<File[]>();
  allFilesObservable: Observable<File[]>;

  constructor(private http: HttpClient) {
    this.allFoldersObservable = this.allFoldersSubject.asObservable();
    this.allFilesObservable = this.allFilesSubject.asObservable();

  }

  getUserFolders(id) {
    this.http.get<Array<Folder>>('/folder_api/' + id).subscribe((data) => {
      console.log(data);
      this.allFolders = data;
      this.allFoldersSubject.next(this.allFolders);
    })
  }

  deleteFolder(folder_id) {
    console.log('im on delete function in the service');
    this.http.delete<Folder[]>('/folder_api/delete/'+ folder_id).subscribe(data => {
      this.allFolders = data;
      this.allFoldersSubject.next(this.allFolders);
    })
  }

  addNewFolder(newFolder, id) {
      this.http.post<Folder[]>('/folder_api/add_folder/' + id, { folder: newFolder}).subscribe((allfolders) => {
        console.log(allfolders)
        this.allFoldersSubject.next(allfolders);
      })
    }
  }




