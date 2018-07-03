import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscriber } from 'rxjs';
import { File } from './file';
import { Folder } from './folder';
import { UserService } from './user.service';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  public allFiles: Array<File>;
  public allFolders: Array<Folder>;
  public currentFolder : Number;
  public currentUser: User;
  public currentFile:File;
  public fileImage: String;

  public userSubject: Subject<User> = new Subject<User>();
  public userOservable: Observable<User>
  public allFilesSubject: Subject<File[]> = new Subject<File[]>();
  public allFilesObservable: Observable<File[]>;
  public allFoldersSubject: Subject<Folder[]> = new Subject<Folder[]>();
  public allFoldersObservable: Observable<Folder[]>;
  public filePicSubject: Subject<string> = new Subject<string>();
  public filePicObservable:Observable<string>;
  public zoomPicSubject: Subject<string> = new Subject<string>();
  public zoomPicObservable:Observable<string>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUser = this.userService.currentUser;
    this.allFoldersObservable = this.allFoldersSubject.asObservable();
    this.allFilesObservable = this.allFilesSubject.asObservable();
    this.userOservable = this.userSubject.asObservable()
    this.filePicObservable = this.filePicSubject.asObservable()
    this.zoomPicObservable = this.zoomPicSubject.asObservable()

  }

  getAllFiles(folder_id): any {
    this.currentFolder = folder_id
    const observable = this.http.get<File[]>('/file_api/' + folder_id);
    observable.subscribe((data) => {
      this.allFiles = data;
      this.allFilesSubject.next(data);
    });

    return observable;
  }

  getFile(file_id) {
    return this.http.get<any>('/file_api/' + file_id)
  }

  getfilterd(filterString,folder_id){
    // console.log('hay')
    console.log(filterString)
    this.http.get<File[]>('/file_api/filer_file/'+filterString + '/' + folder_id).subscribe((data)=>{
      console.log(data);
      this.allFiles = data;
      this.allFilesSubject.next(data);
    })
  }

  addFile(newFile: File) {
   return this.http.post<File>('/file_api/', { file: newFile })
  
  }

  postNewFile (file : FormData) {
   return this.http.post('/file_api/postfile', file)
  }

  deleteFile(file) {
    this.http.delete<File[]>('/file_api/' + file.file_id).subscribe(() => {
      this.getAllFiles(file.folder_id);
    })

  }

  editFile(updatedFile) {
    this.http.put<File[]>('/file_api/', { newFile: updatedFile }).subscribe((data) => {
      this.allFilesSubject.next(data)
    });
  }


  getUserFolders(id) {
    this.http.get<Array<Folder>>('/folder_api/' + id).subscribe((data) => {
      this.allFolders = data;
      this.allFoldersSubject.next(this.allFolders);
    })
  }

  deleteFolder(folder) {

    this.http.delete<Folder[]>('/folder_api/delete/' + folder.folder_id + '/' + folder.user_id ) .subscribe(data => {
      this.allFolders = data;
      this.allFoldersSubject.next(this.allFolders);
    })
  }

  addNewFolder(newFolder, id) {
    this.http.post<Folder[]>('/folder_api/add_folder/' + id, { folder: newFolder }).subscribe((allfolders) => {
      this.allFoldersSubject.next(allfolders);
    })
  }
  saveFileImage(picLink){
    this.filePicSubject.next(picLink)
  }

  fileImageToDialog(the_file){
    this.fileImage = the_file;
  }


}





