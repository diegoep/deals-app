import {Component, inject, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {DealService} from "../../services/deal.service";
import {Deal} from "../../model/deal.model";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, of, switchMap, tap} from "rxjs";
import {DealDialogComponent} from "../deal-dialog/deal-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DealDeleteDialogComponent} from "../deal-delete-dialog/deal-delete-dialog.component";
import {DealsDataTableComponent} from "../deals-data-table/deals-data-table.component";

@Component({
  selector: 'td-list-deals',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardContent, DealsDataTableComponent],
  templateUrl: './list-deals.component.html'
})
export class ListDealsComponent implements OnInit {

  deals: Deal[] = [];
  displayedColumns: string[] = ['id', 'name', 'purchasePrice', 'address', 'NOI', 'capRate'];

  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  private dealService: DealService = inject(DealService);

  ngOnInit(): void {
    this.loadDeals();
  }

  loadDeals() {
    this.route.queryParams.pipe(
      switchMap(params => {
        const dealId = params['dealId'];
        return dealId ? this.dealService.getDeal(parseInt(dealId)) : of(null);
      }),
      filter(deal => !!deal),
      tap(deal => {
        this.open(deal);
      })
    ).subscribe();

    this.dealService.deals$.subscribe(deals => {
      this.deals = deals;
    });
  }

  open(deal: Deal | undefined) {
    const dialogRef = this.dialog.open(DealDialogComponent, {
      minWidth: '80vw',
      minHeight: '60vh',
      data: deal,
    });
    dialogRef.afterClosed().subscribe(() => {
      return this.router.navigate(['/myDeals']);
    });
  }

  openDeleteDialog(deal: Deal) {
    const dialogRef = this.dialog.open(DealDeleteDialogComponent, {
      minWidth: '30vw',
      minHeight: '10vh',
      data: deal,
    });
    dialogRef.afterClosed().subscribe(() => {
      return this.router.navigate(['/myDeals']);
    });
  }

  navigateToEditPage($event: Deal) {
    this.router.navigate(['/editDeal'], {queryParams: {dealId: $event.id}});
  }

}
