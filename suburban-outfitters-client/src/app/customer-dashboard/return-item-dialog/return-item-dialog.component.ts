import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-return-item-dialog',
  templateUrl: './return-item-dialog.component.html',
  styleUrls: ['./return-item-dialog.component.scss']
})
export class ReturnItemDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ReturnItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
