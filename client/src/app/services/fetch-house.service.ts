import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { House } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class FetchHouseService {
  apiHouseUrl = 'http://real-estate-shop.herokuapp.com/houses';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  constructor(private http: HttpClient) {}
  fetchHouse(): Observable<House> {
    return this.http
      .get<House>(this.apiHouseUrl, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
