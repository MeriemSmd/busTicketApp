import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ReservationState } from "./reservation.reducer";
import { getRouterSelectors } from '@ngrx/router-store';

export const selectReservationState = createFeatureSelector<ReservationState>('reservations')

export const selectReservations = createSelector(selectReservationState, (state: ReservationState) => state.reservations)

export const selectBuses = createSelector(selectReservationState, (state: ReservationState) => state.buses.filter(bus => bus.nbrSeats > 0))

export const { selectRouteParams } = getRouterSelectors();

export const selectReservationById = createSelector(
  selectRouteParams,
  selectReservationState,
  ({ id }, { reservations }) => {
    if (!id || !reservations) {
      return undefined;
    }
    return reservations.find(res => res.id === parseInt(id));
  }
);