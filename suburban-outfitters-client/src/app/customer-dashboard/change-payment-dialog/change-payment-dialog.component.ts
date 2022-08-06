import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-payment-dialog',
  templateUrl: './change-payment-dialog.component.html',
  styleUrls: ['./change-payment-dialog.component.scss']
})
export class ChangePaymentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChangePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}
