import {
  ChangeDetectorRef,
  Component, inject,
  input,
  InputSignal, OnChanges,
  OnInit,
  output, OutputEmitterRef, SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSort, MatSortModule} from "@angular/material/sort";
import {MatChipsModule} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Deal} from "../../model/deal.model";
import {MatPaginator} from "@angular/material/paginator";
import {CurrencyPipe, DecimalPipe, PercentPipe} from "@angular/common";


@Component({
  selector: 'td-deals-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatInput,
    MatSortModule,
    MatChipsModule,
    PercentPipe,
    DecimalPipe,
    CurrencyPipe,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatPaginator],
  templateUrl: './deals-data-table.component.html',
  styleUrl: './deals-data-table.component.scss'
})
export class DealsDataTableComponent implements OnInit, OnChanges {

  data: InputSignal<Deal[]> = input<Deal[]>([]);
  displayedColumns: InputSignal<string[]> = input<string[]>([]);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  readonly dataSource: MatTableDataSource<Deal> = new MatTableDataSource<Deal>();
  readonly onRowClicked: OutputEmitterRef<Deal> = output<Deal>();
  readonly onDeleteClicked: OutputEmitterRef<Deal> = output<Deal>();
  readonly onEditClicked: OutputEmitterRef<Deal> = output<Deal>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.sort?.sort(({id: 'id', start: 'desc', disableClear: true}));
    this.loadData();
  }

  loadData() {
    this.dataSource.data = this.data();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeDeal(deal: Deal) {
    this.onDeleteClicked.emit(deal);
  }

  editDeal(deal: Deal) {
    this.onEditClicked.emit(deal);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.loadData();
    }
  }

  click(element: Deal) {
    this.onRowClicked.emit(element);
  }

  getDisplayedColumns() {
    return [...this.displayedColumns(), 'actions'];
  }

}
