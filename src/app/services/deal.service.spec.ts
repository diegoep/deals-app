import { TestBed } from '@angular/core/testing';
import { DealService } from './deal.service';
import {Deal} from "../model/deal.model";

describe('DealService', () => {
  let service: DealService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DealService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a deal by id', (done) => {
    service.getDeal(1).subscribe(deal => {
      expect(deal).toBeDefined();
      expect(deal?.id).toBe(1);
      done();
    });
  });

  it('should add a new deal', () => {
    const newDeal: Deal = {
      name: 'Test Deal',
      purchasePrice: 100000,
      address: '123 Test St, Test City, TX',
      NOI: 10000,
      image: 'test-deal.jpeg',
      description: 'A test deal.'
    };

    const addedDeal = service.addDeal(newDeal);

    expect(addedDeal).toBeDefined();
    expect(addedDeal.id).toBeGreaterThan(0);
    expect(service.deals$.subscribe(deals => {
      expect(deals.length).toBeGreaterThan(30);
    }));
  });

  it('should update an existing deal', () => {
    const updatedDeal: Deal = {
      id: 1,
      name: 'Updated Deal',
      purchasePrice: 400000,
      address: '123 Updated St, Updated City, TX',
      NOI: 30000,
      capRate: 0.07,
      image: 'updated-deal.jpeg',
      description: 'An updated deal.'
    };

    const result = service.updateDeal(updatedDeal);

    expect(result).toEqual(updatedDeal);
    service.getDeal(1).subscribe(deal => {
      expect(deal).toEqual(updatedDeal);
    });
  });

  it('should remove a deal', (done) => {
    const dealToRemove: Deal = { id: 1, name: '', purchasePrice: 0, address: '', NOI: 0, image: '', description: '' };

    service.removeDeal(dealToRemove).subscribe(() => {
      service.getDeal(1).subscribe(deal => {
        expect(deal).toBeUndefined();
        done();
      });
    });
  });
});
