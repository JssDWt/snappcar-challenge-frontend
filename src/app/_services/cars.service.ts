import { Injectable } from '@angular/core';
import { Car, BookingInfo } from '../_models';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getCars(
      from: moment.Moment,
      to: moment.Moment,
      minPrice: number,
      maxPrice: number): Observable<Car[]> {

    if (!from) {
        from = moment();
    }

    if (!to) {
        to = from.add(1, 'day');
    }

    if (!minPrice) {
        minPrice = 0;
    }

    if (!maxPrice) {
        maxPrice = 10000;
    }

    return this.http.get<Car[]>(`${environment.apiBaseUrl}/cars`, {
        params: {
            fromDate: from.toISOString(),
            toDate: to.toISOString(),
            minPrice: minPrice.toString(),
            maxPrice: maxPrice.toString()
        },
    });
  }

  getCar(id: number, from: Date, to: Date): Observable<BookingInfo> {
    return this.http.get<BookingInfo>(`${environment.apiBaseUrl}/cars/${id}`, {
        params: {
            fromDate: from.toISOString(),
            toDate: to.toISOString()
        }
    });
  }
}
