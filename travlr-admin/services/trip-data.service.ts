import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Trip} from '../models/Trip';
// @Injectable({
//   providedIn: 'root'
  
// })
@Injectable()
export class TripDataService {
  constructor(private http: Http){ }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripUrl = `${this.apiBaseUrl}trips/`;

  public getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
        .get(`${this.apiBaseUrl}trips`)
        .toPromise()
        .then(response => response.json() as Trip[])
        .catch(this.handleError);
  }
  // add trip with button 
  public addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrips');
    return this.http
        .post(this.tripUrl, formData)
        .toPromise()
        .then(response => response.json() as Trip[])
        .catch(this.handleError);
  }

  // returns single trip 
  public getTrip(tripCode: string): Promise<Trip> {
    console.log('Inside TripDataService#getTrip(tripCode)');
    return this.http
    .get(this.tripUrl + tripCode)
    .toPromise()
    .then(response => response.json() as Trip)
    .catch(this.handleError);
   }
   // passes entire form data 
   public updateTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#upateTrip');
    console.log(formData);
    return this.http
    .put(this.tripUrl + formData.code, formData)
    .toPromise()
    .then(response => response.json() as Trip[])
    .catch(this.handleError);
   }
  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);  //for demo purposes only 
    return Promise.reject(error.messsage || error);
  }
}

