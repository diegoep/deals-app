import {Component, inject, OnInit} from '@angular/core';
import {DealFormActions, DealFormComponent} from "../deal-form/deal-form.component";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {Deal} from "../../model/deal.model";
import {ActivatedRoute, Router} from "@angular/router";
import {DealService} from "../../services/deal.service";
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";
import {filter, first, of, switchMap, tap} from "rxjs";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'app-edit-deal',
  standalone: true,
  imports: [
    DealFormComponent,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    MatIconButton,
    MatCard
  ],
  templateUrl: './edit-deal.component.html'
})
export class EditDealComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dealService = inject(DealService);
  private readonly snackBar = inject(MatSnackBar);
  protected readonly DealFormActions = DealFormActions;
  deal: Deal | undefined;

  ngOnInit() {
    this.route.queryParams.pipe(
      first(),
      switchMap(params => {
        const dealId = params['dealId'];
        return dealId ? this.dealService.getDeal(parseInt(dealId)) : of(null);
      }),
      filter(deal => !!deal),
      tap(deal => {
        this.deal = deal;
      })
    ).subscribe();
  }

  dealUpdated(deal: Deal) {
    let snackBarRef = this.showSnackBar('Deal updated', 'View');
    snackBarRef.onAction().subscribe(() => this.navigateToDeals({ dealId: deal.id }));
    this.navigateToDeals();
  }

  goHome() {
    this.navigateToDeals();
  }

  private showSnackBar(message: string, action: string = 'Close', duration: number = 3000): MatSnackBarRef<any> {
    return this.snackBar.open(message, action, { duration });
  }

  private navigateToDeals(queryParams: any = {}): void {
    this.router.navigate(['/myDeals'], { queryParams });
  }
}
