import { Component, OnInit } from '@angular/core';
//import {trips} from '../data/trips';
import { TripDataService } from 'services/trip-data.service';
import { Trip } from 'models/Trip';
@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  // hold trip data 
  //trips: Array<any> = trips; 
  trips: Trip[]; // Array of Trip objects 
  message: string;

  constructor(private tripDataService: TripDataService) { }

  private getTrips(): void{
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
        .then(foundTrips => {
          this.message = foundTrips.length > 0 ? '' : 'No Trips Found';
          this.trips = foundTrips;
        });
  }

  ngOnInit() {
    this.getTrips();
  }

}
