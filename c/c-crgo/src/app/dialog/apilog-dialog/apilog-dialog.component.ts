import { Component, Inject, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-apilog-dialog',
  templateUrl: './apilog-dialog.component.html',
  styleUrls: ['./apilog-dialog.component.css']
})
export class ApilogDialogComponent {

  payLoadData;
  constructor(private dialogRef: MatDialogRef<ApilogDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.payLoadData = data;
  }

  onCancel() {
    this.dialogRef.close();
  }

}
