import { CarDetails } from './car-details';

export class BookingInfo {
    carDetails: CarDetails;

    // NOTE: Would go to moment.Moment when involving cultures.
    fromDate: Date;
    toDate: Date;
    priceBreakdown: object;
    totalPrice: string;
}
