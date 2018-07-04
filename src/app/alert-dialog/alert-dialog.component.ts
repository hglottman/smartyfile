import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AlertDialogComponent>) { }

  ngOnInit() {
 
  }

  close() {
    this.dialogRef.close();
  }

}


