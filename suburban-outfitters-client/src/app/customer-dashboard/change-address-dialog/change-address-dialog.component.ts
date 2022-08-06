import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-change-address-dialog',
  templateUrl: './change-address-dialog.component.html',
  styleUrls: ['./change-address-dialog.component.scss']
})
export class ChangeAddressDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ChangeAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
