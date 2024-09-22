import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListDealsComponent } from './list-deals.component';
import { DealService } from '../../services/deal.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { of } from 'rxjs';
import { Deal } from '../../model/deal.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DealDeleteDialogComponent } from '../deal-delete-dialog/deal-delete-dialog.component';
import { DealDialogComponent } from '../deal-dialog/deal-dialog.component';

describe('ListDealsComponent', () => {
  let component: ListDealsComponent;
  let fixture: ComponentFixture<ListDealsComponent>;
  let mockDealService: jasmine.SpyObj<DealService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  const mockDeal: Deal = { id: 1, name: 'Mock Deal', image: 'deal01.jpg', description: 'description', purchasePrice: 100000, address: '123 Main St', NOI: 5000, capRate: 5 };

  beforeEach(async () => {
    mockDealService = jasmine.createSpyObj('DealService', ['getDeal']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);

    const mockDialogRef: MatDialogRef<DealDialogComponent> = {
      afterClosed: () => of(true),
    } as any;
    mockDialog.open.and.returnValue(mockDialogRef);

    mockDealService.getDeal.and.returnValue(of(mockDeal));
    Object.defineProperty(mockDealService, 'deals$', {
      get: () => of([mockDeal])
    });

    await TestBed.configureTestingModule({
      imports: [ListDealsComponent],
      providers: [
        { provide: DealService, useValue: mockDealService },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: { queryParams: of({ dealId: 1 }) } },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDealsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load deals on init', () => {
    component.ngOnInit();
    expect(component.deals).toEqual([mockDeal]);
    expect(mockDealService.getDeal).toHaveBeenCalledWith(1);
  });

  it('should open a deal dialog with the correct data', () => {
    component.open(mockDeal);
    expect(mockDialog.open).toHaveBeenCalledWith(DealDialogComponent, {
      minWidth: '80vw',
      minHeight: '60vh',
      data: mockDeal,
    });
  });

  it('should open delete dialog with the correct deal', () => {
    component.openDeleteDialog(mockDeal);
    expect(mockDialog.open).toHaveBeenCalledWith(DealDeleteDialogComponent, {
      minWidth: '30vw',
      minHeight: '10vh',
      data: mockDeal,
    });
  });

  it('should navigate to edit page when navigating to editDeal', () => {
    component.navigateToEditPage(mockDeal);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/editDeal'], { queryParams: { dealId: mockDeal.id } });
  });
});
