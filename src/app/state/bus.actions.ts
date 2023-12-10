import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Bus } from '../dto/bus';
export const BusActions = createActionGroup({
    source: "reservation",
    events: {
        'Load Buses': emptyProps(),
        'Load Buses Success': props<{buses: Bus[]}>(),
        'Update avalaible seats': props<{ idBus: number }>()
    }
})