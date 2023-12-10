import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationPageComponent } from './reservation-page/reservation-page.component';
import { ReservationRoutingModule } from './reservation-routing.module';
import { StoreModule } from '@ngrx/store';
import { reservationReducer } from '../state/reservation.reducer';
import { ReservationEffects } from '../state/reservation.effects';
import { EffectsModule } from '@ngrx/effects';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { ReservationListComponent } from './reservation-list/reservation-list.component';

@NgModule({
  declarations: [
    ReservationPageComponent,
    ReservationListComponent
  ],
  imports: [
    CommonModule,
    ReservationRoutingModule,
    StoreModule.forFeature('reservations', reservationReducer),
    EffectsModule.forFeature([ReservationEffects]),
    MatTableModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
  ],
  providers:[
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
  }
  ]
})
export class ReservationModule { }
