import {MatSnackBar, MatSnackBarConfig, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBar {

  constructor(private snackBar: MatSnackBar) {
  }

  openSnackBar(message: string, action?: string, config?: MatSnackBarConfig): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, config);
  }

  showSuccess(message: string, duration?: number, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: duration ?? 3000,
      panelClass: 'mat-snack-success'
    });
  }

  showError(message?: string, duration?: number, action?: string): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(message ?? 'An error has occurred', action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: duration ?? 4000,
      panelClass: 'mat-snack-error'
    });
  }

  showWarning(message: string, duration?: number, action?: string): MatSnackBarRef<TextOnlySnackBar> {

    return this.snackBar.open(message, action, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: duration ?? 2000,
      panelClass: 'mat-snack-warning',
    });
  }


  showConnectionError(e: any): MatSnackBarRef<TextOnlySnackBar> {
    if ('message' in e.error)
    {
      return this.showError(e.error.message);
    }
    else{
      return this.showError(`Connection error`);
    }
  }
}
