import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDealComponent } from './add-deal.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import {Deal} from "../../model/deal.model";

describe('AddDealComponent', () => {
  let component: AddDealComponent;
  let fixture: ComponentFixture<AddDealComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [AddDealComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MatSnackBar, useValue: mockSnackBar }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDealComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show snackbar and navigate to myDeals when dealCreated is called', () => {
    const deal = { id: 1 } as Deal; // Mock deal object

    mockSnackBar.open.and.returnValue({
      onAction: () => of(null) // Simulate the action observable
    } as any);

    component.dealCreated(deal);

    expect(mockSnackBar.open).toHaveBeenCalledWith('Deal created', 'View', { duration: 3000 });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/myDeals'], { queryParams: { dealId: 1 } });
  });

  it('should navigate to myDeals when goHome is called', () => {
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/myDeals'], {});
  });
});
