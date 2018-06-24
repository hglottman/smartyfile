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

  getAllFiles(): any {
    const observable = this.http.get<File[]>('/file_api');
    observable.subscribe((data) => {
      this.allFiles = data;
      console.log(data);
      this.allFilesSubject.next(data);
    });
  }

  getCustomer(file_id) {
    return this.http.get<any>('/file_api/' + file_id);
  }

  addFile(newFile: File): void {
    this.http.post<File>('/file_api', { file: newFile }).subscribe(() => {
      this.getAllFiles();
    });
  }

  deleteFile(file_id) {
    this.http.delete<File>('/file_api/' + file_id).subscribe(() => {
      this.getAllFiles();
    });
  }

  editFile(updatedFile) {
    this.http.put<File>('/file_api/' + updatedFile.file_id, { file: updatedFile }).subscribe(() => {
      this.getAllFiles();
    });
  }

}
