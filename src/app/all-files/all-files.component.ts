import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { File } from '../file';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUnitComponent } from '../file-unit/file-unit.component';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {

  files = new Array<File>();
  filterString: string;
  dataSource;
  filesArray: File[]
  folder_id: Number;
  loading:boolean = false

  constructor(private folderService: FolderService, private route: ActivatedRoute, private dialog: MatDialog, private router: Router) {
    this.dataSource = new MatTableDataSource(this.files);
  }

  ngOnInit() {
    this.loading = true
    this.route.params.subscribe(params => {
      this.folderService.getAllFiles(params.id);
    });
    this.folderService.allFilesObservable.subscribe((files) => {
      this.loading = false            
      this.files = files;
      this.folder_id = this.folderService.currentFolder;
    });

  }
  onFilterChanged(filterString) {
    console.log(filterString);
    if(filterString === undefined || filterString === "") {
      this.folderService.getAllFiles(this.folder_id);
    }  else {
      this.getfilterd(filterString,this.folder_id)
        
      }
  

    

  }

  zoomFilePic(the_file) {
    console.log('this is form the all files comonent:')
    console.log(the_file)
    this.folderService.fileImageToDialog(the_file)
  }

  // applyFilter(filterValue) {
  //   console.log(filterValue)
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   console.log(this.dataSource.filter)
  // }

  deleteFile(file) {
    console.log(file)
    this.folderService.deleteFile(file);
  }
  getfilterd(filterString,folder_id) {
    this.folderService.getfilterd(filterString,folder_id)
  }
}
