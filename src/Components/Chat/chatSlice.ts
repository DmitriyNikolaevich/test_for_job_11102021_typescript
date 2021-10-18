import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store/store"

export type MessageType = {
    message: string
    userName: string
    date: string
}

interface InitStateTypes {
    messages: MessageType[]
}

const initialState: InitStateTypes = {
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        loadChat(state, actions: PayloadAction<MessageType[]>) {
            state.messages = actions.payload
        },
        addMessage(state, actions: PayloadAction<MessageType>){
            state.messages.push(actions.payload)
        }
    }
})

export const chatSelector = (state: RootState) => state.chat

export const {
    loadChat,
    addMessage
} = chatSlice.actions

export default chatSlice.reducer