import { createReducer, on } from "@ngrx/store";
import { Client } from "../dto/client";
import { UserAction } from "./user.action";
export interface UserState {
    client: Client | undefined
}
const initialState: UserState = { client: undefined }
export const UserReducer = createReducer(initialState,
    on(UserAction.loadUser, (state) => ({
        ...state
    })),
    on(UserAction.loadUserSuccess, (state, { client }) => ({
        ...state,
        client: client
    }))
)