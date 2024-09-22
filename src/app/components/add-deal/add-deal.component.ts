import {Component, inject} from '@angular/core';
import {DealFormComponent} from "../deal-form/deal-form.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Deal} from "../../model/deal.model";

@Component({
  selector: 'td-add-deal',
  standalone: true,
  imports: [
    DealFormComponent,
    MatCardHeader,
    MatCard,
    MatCardContent
  ],
  templateUrl: './add-deal.component.html'
})
export class AddDealComponent {

  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  dealCreated(deal: Deal) {
    const snackBarRef = this.snackBar.open('Deal created', 'View', {
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      this.navigateToMyDeals(deal.id);
    });

    this.navigateToMyDeals();
  }

  goHome() {
    this.navigateToMyDeals();
  }

  private navigateToMyDeals(dealId?: number) {
    const queryParams = dealId ? { queryParams: { dealId } } : {};
    this.router.navigate(['/myDeals'], queryParams);
  }
}
