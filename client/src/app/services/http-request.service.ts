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

  uploadCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.apiCategoryUrl, category, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  fetchHouse(): Observable<House> {
    return this.http
      .get<House>(this.apiHouseUrl, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  uploadHouse(house: House): Observable<House> {
    return this.http
      .post<House>(this.apiHouseUrl, house, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  deleteHouse(house: House): Observable<ArrayBuffer> {
    return this.http
      .delete<ArrayBuffer>(this.apiHouseUrl + `/${house.id}`, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  updateHouse(house: House): Observable<House> {
    return this.http
      .post<House>(this.apiHouseUrl + `/updateHouse/${house.id}`, house, {
        reportProgress: true,
        observe: 'body',
      })
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
