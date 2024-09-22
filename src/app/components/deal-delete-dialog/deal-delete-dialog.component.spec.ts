import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealDeleteDialogComponent } from './deal-delete-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DealService } from '../../services/deal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import {Deal} from "../../model/deal.model";

describe('DealDeleteDialogComponent', () => {
  let component: DealDeleteDialogComponent;
  let fixture: ComponentFixture<DealDeleteDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DealDeleteDialogComponent>>;
  let mockDealService: jasmine.SpyObj<DealService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  const mockDeal = { id: 1 } as Deal;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockDealService = jasmine.createSpyObj('DealService', ['removeDeal']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [DealDeleteDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockDeal },
        { provide: DealService, useValue: mockDealService },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DealDeleteDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete the deal and show snackbar when deleteDeal is called', () => {
    mockDealService.removeDeal.and.returnValue(of([]));

    component.deleteDeal();

    expect(mockDealService.removeDeal).toHaveBeenCalledWith(mockDeal);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Deal #1 removed', 'Close', { duration: 3000 });
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog when closeDialog is called', () => {
    component.closeDialog();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });
});
