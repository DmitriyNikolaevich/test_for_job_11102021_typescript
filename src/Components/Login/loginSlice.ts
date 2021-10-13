import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"

export const loginSelector = (state: RootState) => state.login

interface InitStateTypes {
    isAuth: boolean
    userName: string
}

const initialState: InitStateTypes = {
    isAuth: false,
    userName: ''
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setIsAuth(state, actions: PayloadAction<boolean>) {
            state.isAuth = actions.payload
        },
        setUserName(state, actions: PayloadAction<string>) {
            state.userName = actions.payload
        }
    }
})

export const {
    setIsAuth
} = loginSlice.actions

export default loginSlice.reducer