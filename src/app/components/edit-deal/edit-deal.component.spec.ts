import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditDealComponent } from './edit-deal.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DealService } from '../../services/deal.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Deal } from '../../model/deal.model';
import { Router } from '@angular/router';

describe('EditDealComponent', () => {
  let component: EditDealComponent;
  let fixture: ComponentFixture<EditDealComponent>;
  let mockActivatedRoute: any;
  let mockDealService: jasmine.SpyObj<DealService>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockDeal: Deal = {
    id: 1,
    name: 'Deal 1',
    description: 'Description 1',
    purchasePrice: 100,
    address: 'Address 1',
    NOI: 50,
    image: 'image1.jpg'
  };

  beforeEach(() => {
    mockActivatedRoute = {
      queryParams: of({ dealId: '1' })
    };

    mockDealService = jasmine.createSpyObj('DealService', ['getDeal']);
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [EditDealComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DealService, useValue: mockDealService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDealComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch deal data on initialization', () => {
    mockDealService.getDeal.and.returnValue(of(mockDeal));

    component.ngOnInit();

    expect(mockDealService.getDeal).toHaveBeenCalledWith(1);
    expect(component.deal).toEqual(mockDeal);
  });

  it('should not set deal if no dealId is provided', () => {
    mockActivatedRoute.queryParams = of({});
    component.ngOnInit();
    expect(mockDealService.getDeal).not.toHaveBeenCalled();
    expect(component.deal).toBeUndefined();
  });

  it('should navigate to deals on goHome call', () => {
    component.goHome();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/myDeals'], { queryParams: {} });
  });

});
