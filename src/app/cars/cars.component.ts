import { Component, OnInit } from '@angular/core';
import { Car } from '../_models';
import { CarsService } from '../_services';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Options, ChangeContext, LabelType } from 'ng5-slider';

@Component({
  selector: 'cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {
  title = 'SnappCar - Find a car';
  cars$: Observable<Car[]>;
  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  minPrice = 0;
  maxPrice = 10000;
  sliderOptions: Options = {
    floor: 0,
    ceil: 100,
    translate: (value: number, label: LabelType): string => '€' + value,
  };
  constructor(
    private carsService: CarsService,
    calendar: NgbCalendar) {
      this.fromDate = calendar.getToday();
      this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
    }

  get toDateMoment() {
    return moment(new Date(this.toDate.year, this.toDate.month, this.toDate.day)).add(1, 'day').startOf('day');
  }

  get fromDateMoment() {
    return moment(new Date(this.fromDate.year, this.fromDate.month, this.fromDate.day)).startOf('day');
  }

  get fromDateString() {
    return this.fromDateMoment.toISOString();
  }

  get toDateString() {
    return this.toDateMoment.toISOString();
  }

  ngOnInit() {
    this.cars$ = this.fetchCars();
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.cars$ = this.fetchCars();
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  convertToDate(date: NgbDate): moment.Moment {
    if (date) {
      return moment(new Date(date.year, date.month, date.day));
    }

    return null;
  }

  onPriceChangeEnd(changeContext: ChangeContext): void {
    this.cars$ = this.fetchCars();
  }

  fetchCars(): Observable<Car[]> {
    return this.carsService.getCars(
      this.fromDateMoment,
      this.toDateMoment,
      this.minPrice,
      this.maxPrice);
  }
}
