import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-dialog',
  templateUrl: './mat-dialog.component.html',
  styleUrls: ['./mat-dialog.component.css'],

  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogTitle,
    MatDialogContent,
  ],
})
export class MatDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MatDialogComponent>);
  data = inject(MAT_DIALOG_DATA);
  constructor() {}

  onCancelClick(): void {
    this.dialogRef.close({
      action: 'cancel',
    });
  }

  onDeleteClick(): void {
    this.dialogRef.close({
      action: 'delete',
    });
  }
}
