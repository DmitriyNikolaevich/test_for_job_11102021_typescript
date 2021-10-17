import React, { FC, memo } from 'react'
import { MessageType } from '../chatSlice'
import s from './Message.module.scss'

export const Message: FC<{ message: MessageType, mine: boolean }> = memo(({ message, mine }) => {
    return (
        <div className={`${s.message} ${mine ? s.mine : ''}`}>
            <div className={s.userName}>
                {message.userName}
            </div>
            <div className={s.text}>
                <span>{message.message}</span>
            </div>
        </div>
    )
})