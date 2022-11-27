import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  /**
   * Show snack bar notification with inserted message
   * @param message Message
   */
  public showNotification(message: string): void {
    this.snackBar.open(message, 'Close', { duration: 2500 });
  }
}
