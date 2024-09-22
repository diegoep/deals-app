import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DealDetailsComponent } from './deal-details.component';
import { Deal } from '../../model/deal.model';

describe('DealDetailsComponent', () => {
  let component: DealDetailsComponent;
  let fixture: ComponentFixture<DealDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DealDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DealDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getDealImage', () => {
    it('should return the full URL when the image starts with http', () => {
      const deal: Deal = { image: 'https://example.com/image.jpg' } as Deal;
      const imageUrl = component.getDealImage(deal);
      expect(imageUrl).toBe('https://example.com/image.jpg');
    });

    it('should return the image path with base path when the image does not start with http', () => {
      const deal: Deal = { image: 'image.jpg' } as Deal;
      const imageUrl = component.getDealImage(deal);
      expect(imageUrl).toBe('deals/image.jpg');
    });

  });
});
