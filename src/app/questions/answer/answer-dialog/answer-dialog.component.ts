import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../answer.component';

@Component({
  selector: 'app-answer-dialog',
  templateUrl: './answer-dialog.component.html',
  styleUrls: ['./answer-dialog.component.css']
})
export class AnswerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AnswerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
