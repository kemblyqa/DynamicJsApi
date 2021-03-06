import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserFunction } from 'src/app/models/user-function';
import { FunctionManagerService } from 'src/app/services/function-manager.service';

@Component({
  selector: 'app-function-dialog',
  templateUrl: './function-dialog.component.html',
  styleUrls: ['./function-dialog.component.css']
})
export class FunctionDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<FunctionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFunction,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }
}
