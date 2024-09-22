import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealDialogComponent } from './deal-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {Deal} from "../../model/deal.model";

describe('DealDialogComponent', () => {
  let component: DealDialogComponent;
  let fixture: ComponentFixture<DealDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DealDialogComponent>>;
  let mockRouter: jasmine.SpyObj<Router>;
  let deal: Deal;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    deal = { id: 1, name: 'Test Deal', description: 'a', NOI: 123, address: 'address', purchasePrice: 123, image: 'deal.jpg' } as Deal;

    TestBed.configureTestingModule({
      imports: [DealDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: deal },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealDialogComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the deal from MAT_DIALOG_DATA', () => {
    expect(component.deal()).toEqual(deal);
  });

  describe('closeDialog', () => {
    it('should call dialogRef.close', () => {
      component.closeDialog();
      expect(mockDialogRef.close).toHaveBeenCalled();
    });
  });
});
