import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Client } from "../dto/client";

export const UserAction = createActionGroup({
    source: 'login',
    events: {
        'Load user': emptyProps(),
        'Load user success': props<{ client: Client }>()
    }
})