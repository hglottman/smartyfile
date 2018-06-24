import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscriber } from 'rxjs';
import { File } from './file';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  // allFolders: Array<Folder>;
  // allFoldersSubject: Subject<Folder[]> = new Subject<Folder[]>();
  // allFoldersObservable: Observable<Folder[]>;

  allFiles: Array<File>;
  allFilesSubject: Subject<File[]> = new Subject<File[]>();
  allFilesObservable: Observable<File[]>;

  constructor(private http: HttpClient) {
    // this.allFoldersObservable = this.allFoldersSubject.asObservable();
    this.allFilesObservable = this.allFilesSubject.asObservable();

  }

}
