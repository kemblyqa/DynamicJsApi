import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Observable } from 'rxjs';
import { AlertDialogComponent } from 'src/app/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertDialogService {

  constructor(private dialog: MatDialog) { }
  public alertDialog(title: string, message: string, cancel: boolean): Observable<boolean> {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '400px';
    dialogConfig.height = 'auto';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: title,
      message: message,
      cancel: cancel
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    return dialogRef.afterClosed();
  }
}
