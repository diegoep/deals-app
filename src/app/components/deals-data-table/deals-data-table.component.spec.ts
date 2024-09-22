import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealsDataTableComponent } from './deals-data-table.component';
import { Deal } from '../../model/deal.model';
import {ChangeDetectorRef, signal} from '@angular/core';
import {provideAnimations} from "@angular/platform-browser/animations";

describe('DealsDataTableComponent', () => {
  let component: DealsDataTableComponent;
  let fixture: ComponentFixture<DealsDataTableComponent>;
  let mockCdr: jasmine.SpyObj<ChangeDetectorRef>;

  const mockDeals: Deal[] = [
    { id: 1, name: 'Deal 1', description: 'Description 1', purchasePrice: 100, address: 'Address 1', NOI: 50, image: 'image1.jpg' },
    { id: 2, name: 'Deal 2', description: 'Description 2', purchasePrice: 200, address: 'Address 2', NOI: 100, image: 'image2.jpg' }
  ];

  beforeEach(() => {
    mockCdr = jasmine.createSpyObj('ChangeDetectorRef', ['detectChanges']);

    TestBed.configureTestingModule({
      imports: [DealsDataTableComponent],
      providers: [
        provideAnimations(),
        { provide: ChangeDetectorRef, useValue: mockCdr },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealsDataTableComponent);
    component = fixture.componentInstance;
    component.data = signal(mockDeals) as unknown as typeof component.data;
    component.displayedColumns = signal(['name', 'purchasePrice']) as unknown as typeof component.displayedColumns;
    component.cdr = mockCdr;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the table and load data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.dataSource.data).toEqual(mockDeals);
    expect(component.dataSource.paginator).toBeTruthy();
    expect(component.dataSource.sort).toBeTruthy();
    expect(mockCdr.detectChanges).toHaveBeenCalled();
  });

  it('should apply filter to the data source', () => {
    component.ngOnInit();
    component.applyFilter('Deal 1');
    expect(component.dataSource.filter).toBe('deal 1');
    expect(component.dataSource.filteredData).toEqual([mockDeals[0]]);
  });

  it('should emit onRowClicked when a row is clicked', () => {
    spyOn(component.onRowClicked, 'emit');
    component.click(mockDeals[0]);
    expect(component.onRowClicked.emit).toHaveBeenCalledWith(mockDeals[0]);
  });

  it('should emit onDeleteClicked when removeDeal is called', () => {
    spyOn(component.onDeleteClicked, 'emit');
    component.removeDeal(mockDeals[0]);
    expect(component.onDeleteClicked.emit).toHaveBeenCalledWith(mockDeals[0]);
  });

  it('should emit onEditClicked when editDeal is called', () => {
    spyOn(component.onEditClicked, 'emit');
    component.editDeal(mockDeals[1]);
    expect(component.onEditClicked.emit).toHaveBeenCalledWith(mockDeals[1]);
  });

});
