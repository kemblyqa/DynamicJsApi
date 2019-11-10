import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FunctionDialogComponent } from 'src/app/dialogs/function-dialog/function-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class FunctionDialogService {
  constructor(private dialog: MatDialog) { }
  public openDialog(data?: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(FunctionDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}
