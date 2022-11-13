import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { header: string; text: string }
  ) {}

  onLeavePage(isUserConfirmLeaving: boolean): void {
    isUserConfirmLeaving
      ? this.dialogRef.close(true)
      : this.dialogRef.close(false);
  }
}
