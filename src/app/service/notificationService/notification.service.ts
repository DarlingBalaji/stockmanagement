
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor( private toastr: ToastrService, private _snackBar: MatSnackBar ) { }

  public showSuccess(message): void{
    this.toastr.clear();
    this.toastr.success(message);
  }

  public showError(message): void{
    this.toastr.clear();
    this.toastr.error(message);
  }

  public showWarning(message): void{
    this.toastr.clear();
    this.toastr.warning(message);
  }

  public snackBar(message, snackbar_Type) {
    this._snackBar.open(message, '', {
      duration: 3000,
      panelClass: [snackbar_Type],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
