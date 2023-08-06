import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'models/Trip';
// @Injectable({
//   providedIn: 'root'
  
// })
@Injectable()
export class TripDataService {
  constructor(private http: HttpClient){ }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;
    // add trip with button 
    public addTrip(formData: Trip): Promise<Trip> {
      console.log('Inside TripDataService#addTrips');
      return this.http
          .post(`${this.apiBaseUrl}trips/`, formData)
          .toPromise()
          .then(response => response as Trip[])
          .catch(this.handleError);
    }

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips ', this.http);
    return this.http
        .get(`${this.apiBaseUrl}trips/`)
        .toPromise()
        .then(response => 
          response as Trip[]
          )
        .catch(this.handleError);
  }


  // returns single trip 
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
      .get(`${this.apiBaseUrl}trips/` + tripCode)
      .toPromise()
      .then(response => response as Trip[])
      .catch(this.handleError);
   }
   // passes entire form data 
   public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#upateTrip');
    console.log(formData);
      return this.http
        .put(`${this.apiBaseUrl}trips/` + formData.code, formData)
        .toPromise()
        .then(response => response as Trip[])
        .catch(this.handleError);
   }
  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);  //for demo purposes only 
    return Promise.reject(error.messsage || error);
  }
}

