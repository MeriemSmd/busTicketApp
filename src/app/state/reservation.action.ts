import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Reservation } from '../dto/reservation';
export const ReservationActions = createActionGroup({
    source: 'Reservation Page',
    events: {
        'Load Reservations ': emptyProps(),
        'Load Reservations Success': props<{reservations: Reservation[]}>(),
        'Add reservation': props<{ reservation: Reservation }>(),
        'Update reservation': props<{ reservation: Reservation }>(),
        'Delete reservation': props<{ id: number }>()
    }
})