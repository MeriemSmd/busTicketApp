import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PaymentType } from 'src/app/dto/paymentType';
import { Reservation } from 'src/app/dto/reservation';
import { ReservationActions } from 'src/app/state/reservation.action';
import { selectReservations } from 'src/app/state/reservation.selector';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent {

  reservations$ = this.store.select(selectReservations)
  dataSource: Reservation[] = []
  reservationSubscription: Subscription
  displayedColumns: string[] = ['reservationDate', 'buses', 'paymentType', 'price', 'actions'];

  constructor(private store: Store, private router: Router) {
    this.reservationSubscription = this.reservations$.subscribe(res => this.dataSource = res)
  }
  getPaymentType(paymentType: number) {
    return paymentType == 0 ? "CREDIT CARD" : "PAYPAL"
  }
  getPrice(reservation: Reservation) {
    let price = 0
    reservation.buses.forEach(bus => reservation.paymentType == PaymentType.PAYPAL
      ? price += 0.95 * bus.price
      : price += bus.price)
    return price
  }
  deleteReservation(element: Reservation) {
    let id = element.id
    this.store.dispatch(ReservationActions.deleteReservation({ id }))
  }
  ngOnDestroy() {
    this.reservationSubscription.unsubscribe()
  }
}
