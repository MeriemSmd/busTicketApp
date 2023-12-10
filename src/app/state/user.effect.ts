import { Injectable } from "@angular/core";
import { InitService } from "../service/initService";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BusActions } from "./bus.actions";
import { exhaustMap, map } from "rxjs";
import { UserAction } from "./user.action";

@Injectable()
export class UserEffect {
    constructor(private intService: InitService,
        private actions$: Actions) {
    }
    loadUser$ = createEffect(() =>
        this.actions$.pipe(ofType(UserAction.loadUser),
            exhaustMap(() => this.intService.getCurrentUser().pipe(
                map(client => UserAction.loadUserSuccess({ client }))
            ))))
}