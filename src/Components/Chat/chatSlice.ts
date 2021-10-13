import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface InitStateTypes {
    messages: string[]
}

const initialState: InitStateTypes = {
    messages: []
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        loadChat(state, actions: PayloadAction<string[]>) {
            state.messages = actions.payload
        },
        addMessage(state, actions: PayloadAction<string>){
            state.messages.push(actions.payload)
        }
    }
})

export const {
    loadChat,
    addMessage
} = chatSlice.actions

export default chatSlice.reducer