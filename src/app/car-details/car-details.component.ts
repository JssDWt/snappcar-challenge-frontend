import { Component, OnInit } from '@angular/core';
import { BookingInfo } from '../_models';
import { CarsService } from '../_services';
import { Observable, combineLatest } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  title = 'snappcar-challenge-frontend';
  bookingInfo$: Observable<BookingInfo>;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService) {
  }

  ngOnInit() {
    const self = this;
    this.bookingInfo$ = combineLatest(this.route.paramMap, this.route.queryParamMap)
      .pipe(
        switchMap((params: ParamMap[]) => {
          const id = Number(params[0].get('id'));
          const from = new Date(params[1].get('from'));
          const to = new Date(params[1].get('to'));
          return this.carsService.getCar(id, from, to);
        }));
  }
}
