import {Component, inject, model} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {Deal} from "../../model/deal.model";
import {DealDetailsComponent} from "../deal-details/deal-details.component";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'td-deal-dialog',
  standalone: true,
  imports: [DealDetailsComponent, MatDialogActions, MatDialogContent, MatButton, MatIconButton, MatIcon],
  templateUrl: './deal-dialog.component.html',
  styleUrl: './deal-dialog.component.scss'
})
export class DealDialogComponent {
  readonly dialogRef = inject(MatDialogRef<DealDialogComponent>);
  readonly data = inject<Deal>(MAT_DIALOG_DATA)
  readonly deal = model(this.data);
  readonly router = inject(Router);

  closeDialog() {
    this.dialogRef.close();
  }

}
