import { Injectable } from "@angular/core";
import { InitService } from "../service/initService";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BusActions } from "./bus.actions";
import { exhaustMap, map } from "rxjs";
@Injectable()
export class ReservationEffects {
    constructor(private intService: InitService,
        private actions$: Actions) {
    }
    loadBuses$ = createEffect(() =>
        this.actions$.pipe(ofType(BusActions.loadBuses),
            exhaustMap(() => this.intService.getBuses().pipe(
                map(buses => BusActions.loadBusesSuccess({ buses }))
            ))))
    loadUser$ = createEffect(() =>
        this.actions$.pipe(ofType(BusActions.loadBuses),
            exhaustMap(() => this.intService.getBuses().pipe(
                map(buses => BusActions.loadBusesSuccess({ buses }))
            ))))
}