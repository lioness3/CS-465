import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from 'models/Trip';
import { User } from 'src/app/models/user';
import { AuthResponse } from 'src/app/models/authresponse';
import { BROWSER_STORAGE } from 'src/app/storage';
// @Injectable({
//   providedIn: 'root'
  
// })
@Injectable()
export class TripDataService {
  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage){ }

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
     // returns single trip 
  public deleteTrip(tripCode: string){
    console.log('Inside TripDataService#deleteTrip(tripCode)');
    return this.http
      .delete(tripCode)
      .toPromise()
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

public login(user: User): Promise<AuthResponse> {
  return this.makeAuthApiCall('login', user);
  } 

public register(user: User): Promise<AuthResponse> {
  return this.makeAuthApiCall('register', user);
  }

private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
}

}