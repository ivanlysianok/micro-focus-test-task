import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}

  showNotification(notificationMsg: string): void {
    this.snackBar.open(notificationMsg, undefined, { duration: 2000 });
  }
}
