import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Bus } from 'src/app/dto/bus';
import { PaymentType } from 'src/app/dto/paymentType';
import { Reservation } from 'src/app/dto/reservation';
import { BusActions } from 'src/app/state/bus.actions';
import { ReservationActions } from 'src/app/state/reservation.action';
import { selectBuses, selectReservationById } from 'src/app/state/reservation.selector';
import { selectUser } from 'src/app/state/user.selesctor';

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})
export class ReservationPageComponent {
  idClient: number = 0;
  reservationId: number = 0;
  form: FormGroup
  step = 1;
  PaymentType = PaymentType;
  client$ = this.store.select(selectUser)
  buses$ = this.store.select(selectBuses)
  reservation = this.store.select(selectReservationById)

  displayedColumns: string[] = ['select', 'destination', 'startHour', 'price'];
  selection = new SelectionModel<Bus>(true, []);
  dataSource = new MatTableDataSource<Bus>();
  selectedItems = new Set<Bus>();

  clientSubscription: Subscription;
  busesSubscription: Subscription
  reservationSubscription: Subscription;

  constructor(private store: Store, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      selectedItems: [this.selectedItems, Validators.required],
      date: [new Date(), Validators.required],
      paymentType: [null, Validators.required],
      mail: [null],
      cardNumber: [null]
    })

    this.store.dispatch(BusActions.loadBuses());
    this.clientSubscription = this.client$.subscribe(c => this.idClient = c?.id ?? 0)
    this.busesSubscription = this.buses$.subscribe(buses => this.dataSource.data = buses)
    this.reservationSubscription = this.reservation.subscribe(res => {
      if (res?.buses != undefined) {
        this.reservationId = res.id
        this.form = this.fb.group({
          selectedItems: [res?.buses, Validators.required],
          date: [res?.reservationDate, Validators.required],
          paymentType: [res?.paymentType, Validators.required],
          mail: [res?.mail],
          cardNumber: [res?.cardNumber]
        });
        res.buses.forEach(row => { this.selectedItems.add(row); this.selection.select(row) })
      }
    })

  }

  checkedValue(row: Bus) {
    let checked: boolean = false;
    this.selectedItems.forEach(bus => { if (bus.id == row.id) checked = true });
    return checked
  }
  masterToggle(event: any): void {
    if (event.checked) {
      this.dataSource.data.forEach((row) => { this.selectedItems.add(row); this.selection.select(row) });
    } else {
      this.selection.clear();
      this.selectedItems.clear();
    }
  }

  onCheckboxChange(event: any, row: Bus) {
    if (event.checked) {
      this.selectedItems.add(row);
    } else {
      this.selectedItems.forEach(sel => { if (sel.id == row.id) this.selectedItems.delete(sel) })
    }
  }
  onSubmit() {
    const reservation: Reservation = {
      id: this.reservationId == 0 ? Math.floor(Math.random() * Number.MAX_SAFE_INTEGER) : this.reservationId,
      buses: [...this.selectedItems],
      idClient: this.idClient,
      paymentType: this.form.get('paymentType')?.value,
      reservationDate: this.form.get('date')?.value,
      mail: this.form.get('mail')?.value,
      cardNumber: this.form.get('cardNumber')?.value
    }
    this.selectedItems.forEach(bus => {
      let idBus = bus.id;
      this.store.dispatch(BusActions.updateAvalaibleSeats({ idBus }))
    })
    this.store.dispatch(ReservationActions.addReservation({ reservation }))

    this.router.navigate(['/reservation-list'])
  }
  toStep(step: number) {
    this.step = step
  }
  onPaymentTypeChange() {
    if (this.form.get('paymentType')?.value == PaymentType.CREDIT_CARD) {
      this.form.get('cardNumber')?.setValidators([Validators.required, Validators.pattern(/^[0-9]{16}$/)])
      this.form.get('mail')?.removeValidators
    } else {
      this.form.get('mail')?.setValidators([Validators.required, Validators.email])
      this.form.get('cardNumber')?.removeValidators
    }
  }
  isFormValid() {
    return this.form.valid
  }
  ngOnDestroy() {
    this.clientSubscription.unsubscribe()
    this.busesSubscription.unsubscribe()
    this.reservationSubscription.unsubscribe()
  }


}
