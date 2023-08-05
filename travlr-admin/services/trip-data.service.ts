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
        .post(`${this.apiBaseUrl}trips`, formData)
        .toPromise()
        .then(response => response.json() as Trip[])
        .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong', error);  //for demo purposes only 
    return Promise.reject(error.messsage || error);
  }
}

