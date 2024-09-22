import {Component, model} from '@angular/core';
import {Deal} from "../../model/deal.model";
import {MatDialogContent} from "@angular/material/dialog";
import {DecimalPipe, NgOptimizedImage, PercentPipe} from "@angular/common";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'td-deal-details',
  standalone: true,
  imports: [
    MatDialogContent,
    DecimalPipe,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatIcon,
    NgOptimizedImage,
    PercentPipe
  ],
  templateUrl: './deal-details.component.html',
  styleUrl: './deal-details.component.scss'
})
export class DealDetailsComponent {
  readonly deal = model.required<Deal>();
  private readonly baseImagePath = 'deals/';

  readonly getDealImage = (deal: Deal): string =>
    deal?.image?.startsWith('http') ? deal.image : `${this.baseImagePath}${deal.image}`;

}
