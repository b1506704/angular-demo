import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { House } from '../models/house.model';

@Injectable({
  providedIn: 'root',
})
export class FetchHouseService {
  apiHouseUrl = 'https://real-estate-shop.herokuapp.com/houses';
  apiCategoryUrl = 'https://real-estate-shop.herokuapp.com/categories';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json'
  //   })
  // }
  constructor(private http: HttpClient) {}

  fetchCategory(): Observable<Category> {
    return this.http
      .get<Category>(this.apiCategoryUrl, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  fetchHouse(): Observable<House> {
    return (
      this.http
        .get<House>(this.apiHouseUrl, {
          reportProgress: true,
          observe: 'body',
        })
        // insert fetchCategory in this pipe for promise-chaining-like mechanism ?
        .pipe(
          catchError(this.handleError)
          )
    );
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
