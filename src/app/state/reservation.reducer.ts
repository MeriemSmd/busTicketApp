import { createReducer, on } from "@ngrx/store";
import { Bus } from "../dto/bus";
import { Reservation } from "../dto/reservation";
import { BusActions } from "./bus.actions";
import { ReservationActions } from "./reservation.action";

export interface ReservationState {
    buses: Bus[];
    reservations: Reservation[];
}
const initialState: ReservationState = { buses: [], reservations: [] }
export const reservationReducer = createReducer(initialState,
    on(BusActions.loadBusesSuccess, (state, { buses }) => ({
        ...state,
        buses: buses
    })),
    on(BusActions.loadBuses, (state) => ({
        ...state,
        buses: []
    })),
    on(ReservationActions.addReservation, (state, { reservation }) => ({
        ...state,
        reservations:
            state.reservations.filter(res => res.id == reservation.id).length == 0 ?
                [...state.reservations, reservation] :
                state.reservations.map(res => { return res.id == reservation.id ? reservation : res })
    })),
    on(ReservationActions.deleteReservation, (state, { id }) => ({
        ...state,
        reservations: state.reservations.filter(res => res.id != id)
    })),
    on(ReservationActions.loadReservationsSuccess, (state, { reservations }) => ({
        ...state,
        reservations
    })),
    on(BusActions.updateAvalaibleSeats, (state, { idBus }) => ({
        ...state,
        buses: state.buses.map(bus => { return { ...bus, nbrSeats: idBus == bus.id ? bus.nbrSeats - 1 : bus.nbrSeats } })

    }))
)