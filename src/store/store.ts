import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authAPI } from "../API/logiAPI"
import loginReducer from '../Components/Login/loginSlice'

export const store  = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        login: loginReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
})



//@ts-ignore
window.__store__ = store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)