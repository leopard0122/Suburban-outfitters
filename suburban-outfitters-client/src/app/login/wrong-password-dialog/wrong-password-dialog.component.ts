import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-wrong-password-dialog',
  templateUrl: './wrong-password-dialog.component.html',
  styleUrls: ['./wrong-password-dialog.component.scss']
})
export class WrongPasswordDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WrongPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}


