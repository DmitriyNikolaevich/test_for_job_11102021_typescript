import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authAPI } from "../API/logiAPI"
import loginReducer from '../Components/Login/loginSlice'
import chatReducer from '../Components/Chat/chatSlice'

export const store  = configureStore({
    reducer: {
        [authAPI.reducerPath]: authAPI.reducer,
        login: loginReducer,
        chat: chatReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
        .concat(authAPI.middleware)
})



//@ts-ignore
window.__store__ = store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

setupListeners(store.dispatch)