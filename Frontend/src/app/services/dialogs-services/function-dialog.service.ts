import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FunctionDialogComponent } from 'src/app/dialogs/function-dialog/function-dialog.component';
import { AddFunctionComponent } from 'src/app/dialogs/add-function/add-function.component';
import { Observable } from 'rxjs';
import { UserFunction } from 'src/app/models/user-function';

@Injectable({
  providedIn: 'root'
})
export class FunctionDialogService {
  constructor(private dialog: MatDialog) { }
  public openDialog(data?: any) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '1000px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(FunctionDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
  public createOrModifyDialog(data?: any): Observable<UserFunction> {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '1000px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(AddFunctionComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}
