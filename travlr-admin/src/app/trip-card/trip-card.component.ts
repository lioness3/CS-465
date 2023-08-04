import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  // use input as trip passed into it to render a single instance of a trip
  @Input('trip') trip: any;

  constructor() { }

  ngOnInit() {
  }

}
