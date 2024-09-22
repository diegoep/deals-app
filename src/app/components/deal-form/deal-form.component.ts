import {Component, inject, input, InputSignal, model, ModelSignal, OnInit, output} from '@angular/core';
import {MatDialogContent} from "@angular/material/dialog";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {Deal} from "../../model/deal.model";
import {MatInput} from "@angular/material/input";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard} from "@angular/material/card";
import {DealService} from "../../services/deal.service";

export enum DealFormActions {
  ADD = 'add',
  EDIT = 'edit'
}

@Component({
  selector: 'td-deal-form',
  standalone: true,
  imports: [
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton,
    MatCard,
    MatIconButton,
  ],
  templateUrl: './deal-form.component.html',
  styleUrl: './deal-form.component.scss'
})
export class DealFormComponent implements OnInit {

  dealForm: FormGroup = new FormGroup({});
  readonly deal: ModelSignal<Deal> = model({
    name: '',
    description: '',
    purchasePrice: 0,
    address: '',
    NOI: 0,
    image: ''
  });
  private readonly fb: FormBuilder = inject(FormBuilder);
  private readonly dealService: DealService = inject(DealService);
  protected readonly DealFormActions = DealFormActions;
  readonly onCancel = output();
  action: InputSignal<DealFormActions> = input<DealFormActions>(DealFormActions.ADD);

  ngOnInit() {
    this.dealForm = this.fb.group({
      id: [this.deal()?.id],
      name: [this.deal()?.name, Validators.required],
      description: [this.deal()?.description, Validators.required],
      purchasePrice: [this.deal()?.purchasePrice, [Validators.required, Validators.min(0)]],
      address: [this.deal()?.address, Validators.required],
      NOI: [this.deal()?.NOI, [Validators.required, Validators.min(0)]],
      image: [this.deal()?.image],
    });
  }

  onSubmit(): void {
    if (this.dealForm.valid) {
      let deal = this.dealForm.value;
      if (this.action() === DealFormActions.ADD) {
        deal = this.dealService.addDeal(deal)
      } else if (this.action() === DealFormActions.EDIT) {
        deal = this.dealService.updateDeal(deal)
      }
      this.deal.set(deal);
    }
  }

  cancel() {
    this.onCancel.emit();
  }
}
