import { Component, OnInit } from '@angular/core';
import {trips} from '../data/trips';
@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css']
})
export class TripListingComponent implements OnInit {
  // hold trip data 
  trips: Array<any> = trips; 
  
  constructor() { }

  ngOnInit() {
  }

}
