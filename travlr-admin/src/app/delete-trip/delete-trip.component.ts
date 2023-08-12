import { Component, OnInit , Input} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TripDataService } from 'services/trip-data.service';
import { Trip } from 'models/Trip';
@Component({
  selector: 'app-delete-trip',
  templateUrl: './delete-trip.component.html',
  styleUrls: ['./delete-trip.component.css']
})
export class DeleteTripComponent implements OnInit {
  @Input('trip') trip: any;
  confirmed = false;
  tripName: String;
  constructor(
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() {
          // retrieve stashed tripId
          let tripCode = localStorage.getItem("tripCode");
          if (!tripCode) {
             alert("Something wrong, couldn't find where I stashed tripCode!");
            this.router.navigate(['']);
            return;
          } else{
            this.tripService.getTrip(tripCode)
            .then(data => {
              console.log(data[0].name, '  data value from trip code');
              this.tripName = data[0].name;
            })
          }

       
  }
confirmDelete(value){

  console.log(value)
//  if(Button.value === 'deleteTrip'){
//   alert('item deleted!')
//  }
 this.router.navigate(['']);
}

}
