import { Bus } from "./bus";
import { PaymentType } from "./paymentType";

export interface Reservation {
    id: number;
    idClient: number;
    reservationDate: Date;
    buses: Bus[];
    paymentType: PaymentType;
    mail: string;
    cardNumber: string
}