import React, { FC, memo } from 'react'
import { MessageType } from '../chatSlice'
import s from './Message.module.scss'
import moment from 'moment'
import 'moment/locale/ru'

export const Message: FC<{ message: MessageType, mine: boolean }> = memo(({ message, mine }) => {
    return (
        <div className={`${s.message} ${mine ? s.mine : ''}`}>
            <div className={s.userName}>
                <div>{message.userName}</div>
                <div>{`${moment(message.date) === moment(new Date()) ? moment(message.date).locale('ru').format('DD MMM') : 'Today'} ${moment(message.date).format('hh:mm')}`}</div>
            </div>
            <div className={s.text}>
                <span>{message.message}</span>
            </div>
        </div>
    )
})