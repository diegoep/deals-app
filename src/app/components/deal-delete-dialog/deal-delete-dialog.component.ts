import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {DealService} from "../../services/deal.service";
import {Deal} from "../../model/deal.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-deal-delete-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButton,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './deal-delete-dialog.component.html'
})
export class DealDeleteDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DealDeleteDialogComponent>);
  readonly data = inject<Deal>(MAT_DIALOG_DATA)
  readonly dealService = inject(DealService);
  readonly snackBar = inject(MatSnackBar);

  deleteDeal() {
    this.dealService.removeDeal(this.data).subscribe(() => {
      this.snackBar.open('Deal #'+this.data.id + ' removed', 'Close', { duration: 3000 });
      this.dialogRef.close();
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
