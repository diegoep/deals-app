import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {Deal} from "../model/deal.model";

@Injectable({
  providedIn: 'root'
})
export class DealService {

  private readonly dealsSubject = new BehaviorSubject<Deal[]>(this.getMockData());
  private lastId: number = this.dealsSubject.value.reduce((maxId, deal) => Math.max(maxId, deal.id || 0), 0);

  public getDeal(id: number): Observable<Deal | undefined> {
    return this.deals$.pipe(
      map(deals => deals.find(d => d.id === id))
    );
  }

  public addDeal(deal: Deal): Deal {
    const newDeal = { ...deal, id: ++this.lastId };
    this.dealsSubject.next([...this.dealsSubject.value, newDeal]);
    return newDeal;
  }

  public updateDeal(deal: Deal): Deal {
    const updatedDeals = this.dealsSubject.value.map(d =>
      d.id === deal.id ? deal : d
    );
    this.dealsSubject.next(updatedDeals);
    return deal;
  }

  get deals$(): Observable<Deal[]> {
    return this.dealsSubject.asObservable().pipe(
      map(deals => deals.map(deal => ({
        ...deal,
        capRate: this.calculateCapRate(deal)
      })))
    );
  }

  private calculateCapRate(deal: Deal): number {
    return Number((deal.NOI / deal.purchasePrice).toFixed(2));
  }

  private getMockData() {
    return [
      { "id": 1, "name": "Sunnyvale Apartments", "purchasePrice": 360000, "address": "123 Sunny Ave, Sunnyvale, CA", "NOI": 28800, "image": "deal-01.jpeg", "description": "Charming apartments located in the heart of Sunnyvale." },
      { "id": 2, "name": "Oakwood Estates", "purchasePrice": 480000, "address": "456 Oak St, Oakwood, TX", "NOI": 33600, "image": "deal-02.jpeg", "description": "Spacious estates surrounded by beautiful oak trees." },
      { "id": 3, "name": "Maple Grove", "purchasePrice": 310000, "address": "789 Maple Dr, Maplewood, FL", "NOI": 18600, "image": "deal-03.jpeg", "description": "A cozy community with scenic maple trees." },
      { "id": 4, "name": "Pine Hill Condos", "purchasePrice": 400000, "address": "321 Pine Hill Rd, Pine City, NY", "NOI": 46000, "image": "deal-04.jpeg", "description": "Modern condos with stunning hilltop views." },
      { "id": 5, "name": "Riverfront Homes", "purchasePrice": 550000, "address": "654 River Rd, Riverside, CA", "NOI": 49500, "image": "deal-05.jpeg", "description": "Beautiful homes along the scenic riverside." },
      { "id": 6, "name": "Cedar Valley", "purchasePrice": 400000, "address": "987 Cedar Ln, Cedarville, OH", "NOI": 24000, "image": "deal-06.jpeg", "description": "Serene valley homes with a peaceful atmosphere." },
      { "id": 7, "name": "Elmwood Residences", "purchasePrice": 375000, "address": "234 Elm St, Elmwood, NJ", "NOI": 22500, "image": "deal-07.jpeg", "description": "Charming residences nestled among elm trees." },
      { "id": 8, "name": "Birchwood Park", "purchasePrice": 420000, "address": "567 Birchwood Blvd, Birchwood, PA", "NOI": 31500, "image": "deal-08.jpeg", "description": "Family-friendly park homes with ample green space." },
      { "id": 9, "name": "Cypress Lakes", "purchasePrice": 600000, "address": "890 Cypress St, Cypress City, WA", "NOI": 45000, "image": "deal-09.jpeg", "description": "Elegant homes with direct access to the lake." },
      { "id": 10, "name": "Willow Creek Estates", "purchasePrice": 350000, "address": "123 Willow Dr, Willow Creek, OR", "NOI": 17500, "image": "deal-10.jpeg", "description": "Charming estates with a picturesque creek view." },
      { "id": 11, "name": "Hillside Villas", "purchasePrice": 470000, "address": "456 Hillside Rd, Hilltop, CO", "NOI": 28200, "image": "deal-11.jpeg", "description": "Luxury villas perched on a hillside with great views." },
      { "id": 12, "name": "Lakeview Heights", "purchasePrice": 490000, "address": "789 Lakeview Ave, Lakeview, IL", "NOI": 34300, "image": "deal-12.jpeg", "description": "Stunning homes with breathtaking lake views." },
      { "id": 13, "name": "Sunset Ridge", "purchasePrice": 520000, "address": "321 Sunset Blvd, Sunset Valley, TX", "NOI": 41600, "image": "deal-13.jpeg", "description": "Modern homes with spectacular sunset views." },
      { "id": 14, "name": "Coral Bay", "purchasePrice": 480000, "address": "654 Coral Way, Coral Springs, FL", "NOI": 33600, "image": "deal-14.jpeg", "description": "Beachfront properties in a tropical paradise." },
      { "id": 15, "name": "Grandview Condos", "purchasePrice": 540000, "address": "987 Grandview Rd, Grandview, AZ", "NOI": 43200, "image": "deal-15.jpeg", "description": "Stylish condos with panoramic mountain views." },
      { "id": 16, "name": "Desert Oasis", "purchasePrice": 430000, "address": "234 Desert Ln, Desert Ridge, NV", "NOI": 30100, "image": "deal-16.jpeg", "description": "Luxurious homes surrounded by beautiful desert landscapes." },
      { "id": 17, "name": "Mountain Retreat", "purchasePrice": 560000, "address": "567 Mountain Rd, Mountainview, NM", "NOI": 44800, "image": "deal-17.jpeg", "description": "Secluded mountain retreat with stunning scenery." },
      { "id": 18, "name": "Pacific Heights", "purchasePrice": 590000, "address": "890 Pacific St, Pacific Grove, CA", "NOI": 47200, "image": "deal-18.jpeg", "description": "Luxury homes with amazing coastal views." },
      { "id": 19, "name": "Silver Lake Villas", "purchasePrice": 410000, "address": "123 Silver Lake Rd, Silverlake, TX", "NOI": 22550, "image": "deal-19.jpeg", "description": "Charming villas located by Silver Lake." },
      { "id": 20, "name": "Aspen Woods", "purchasePrice": 480000, "address": "456 Aspen Dr, Aspen, CO", "NOI": 31200, "image": "deal-20.jpeg", "description": "Elegant homes in a serene wooded setting." },
      { "id": 21, "name": "Horizon Towers", "purchasePrice": 500000, "address": "789 Horizon Blvd, Horizon City, TX", "NOI": 40000, "image": "deal-21.jpeg", "description": "Modern towers with breathtaking views." },
      { "id": 22, "name": "Brighton Commons", "purchasePrice": 420000, "address": "321 Brighton St, Brighton, MA", "NOI": 25200, "image": "deal-22.jpeg", "description": "Community-centered homes in a vibrant neighborhood." },
      { "id": 23, "name": "Greenfield Acres", "purchasePrice": 370000, "address": "654 Greenfield Rd, Greenfield, WI", "NOI": 22200, "image": "deal-23.jpeg", "description": "Affordable homes with spacious yards." },
      { "id": 24, "name": "Skyline Heights", "purchasePrice": 560000, "address": "987 Skyline Dr, Skyline, UT", "NOI": 44800, "image": "deal-24.jpeg", "description": "Contemporary homes with impressive skyline views." },
      { "id": 25, "name": "Canyon View Estates", "purchasePrice": 600000, "address": "234 Canyon View Rd, Canyon City, ID", "NOI": 60000, "image": "deal-25.jpeg", "description": "Luxury estates with stunning canyon views." },
      { "id": 26, "name": "Valley Ridge", "purchasePrice": 540000, "address": "567 Valley Rd, Valleyview, KS", "NOI": 37800, "image": "deal-26.jpeg", "description": "Elegant homes with beautiful valley scenery." },
      { "id": 27, "name": "Brookstone Apartments", "purchasePrice": 480000, "address": "890 Brookstone Ln, Brookfield, CT", "NOI": 33600, "image": "deal-27.jpeg", "description": "Modern apartments with convenient access." },
      { "id": 28, "name": "Oceanview Towers", "purchasePrice": 620000, "address": "123 Oceanview Dr, Ocean City, NJ", "NOI": 62000, "image": "deal-28.jpeg", "description": "Luxury towers with stunning ocean views." },
      { "id": 29, "name": "Clearwater Shores", "purchasePrice": 590000, "address": "456 Clearwater Rd, Clearwater, FL", "NOI": 47200, "image": "deal-29.jpeg", "description": "Elegant homes with beachfront access." },
      { "id": 30, "name": "Windsor Gardens", "purchasePrice": 420000, "address": "789 Windsor Dr, Windsor, MA", "NOI": 25200, "image": "deal-30.jpeg", "description": "Beautiful gardens surround these charming homes." }
    ]
  }

  removeDeal(deal: Deal) {
    this.dealsSubject.next(this.dealsSubject.value.filter(d => d.id !== deal.id));
    return this.dealsSubject.asObservable();
  }
}
