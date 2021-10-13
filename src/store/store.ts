import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import loginReducer from '../Components/Login/loginSlice'

export const store  = configureStore({
    reducer: {
        login: loginReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)