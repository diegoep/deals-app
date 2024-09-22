import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealFormComponent, DealFormActions } from './deal-form.component';
import { FormBuilder } from '@angular/forms';
import { DealService } from '../../services/deal.service';
import {provideAnimations} from "@angular/platform-browser/animations";
import {signal} from "@angular/core";

describe('DealFormComponent', () => {
  let component: DealFormComponent;
  let fixture: ComponentFixture<DealFormComponent>;
  let mockDealService: jasmine.SpyObj<DealService>;

  beforeEach(() => {
    mockDealService = jasmine.createSpyObj('DealService', ['addDeal', 'updateDeal']);

    TestBed.configureTestingModule({
      imports: [DealFormComponent],
      providers: [
        provideAnimations(),
        FormBuilder,
        { provide: DealService, useValue: mockDealService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DealFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    component.ngOnInit();
    expect(component.dealForm).toBeTruthy();
    expect(component.dealForm.controls['name'].valid).toBeFalse();
    expect(component.dealForm.controls['description'].valid).toBeFalse();
  });

  it('should submit the form and call addDeal when action is ADD', async () => {
    component.action = signal(DealFormActions.ADD) as unknown as typeof component.action;
    fixture.detectChanges();

    component.dealForm.setValue({
      id: null,
      name: 'Test Deal',
      description: 'Test Description',
      purchasePrice: 1000,
      address: 'Test Address',
      NOI: 500,
      image: 'test.jpg',
    });

    mockDealService.addDeal.and.returnValue({ id: 1, ...component.dealForm.value });

    component.onSubmit();
    fixture.detectChanges();

    expect(mockDealService.addDeal).toHaveBeenCalledWith(component.dealForm.value);
    expect(component.deal()).toEqual({ id: 1, ...component.dealForm.value });
  });

  it('should submit the form and call updateDeal when action is EDIT', () => {
    component.action = signal(DealFormActions.EDIT) as unknown as typeof component.action;
    fixture.detectChanges();

    component.dealForm.setValue({
      id: 1,
      name: 'Updated Deal',
      description: 'Updated Description',
      purchasePrice: 1500,
      address: 'Updated Address',
      NOI: 700,
      image: 'updated.jpg',
    });

    mockDealService.updateDeal.and.returnValue({ ...component.dealForm.value });

    component.onSubmit();
    fixture.detectChanges();

    expect(mockDealService.updateDeal).toHaveBeenCalledWith(component.dealForm.value);
    expect(component.deal()).toEqual({ ...component.dealForm.value });
  });

  it('should emit onCancel when cancel is called', () => {
    spyOn(component.onCancel, 'emit');
    component.cancel();
    expect(component.onCancel.emit).toHaveBeenCalled();
  });
});
