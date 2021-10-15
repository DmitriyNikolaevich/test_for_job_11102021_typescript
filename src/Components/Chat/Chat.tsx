import React, { ChangeEvent, FC, useRef, useCallback, useState, useEffect } from 'react'
import s from './Chat.module.scss'
import { compose } from 'redux'
import withAuthRedirect from '../../HOC/withAuthRedirect'
import emodziIcon from '../../assets/icons/emodziIcon.svg'
import mail from '../../assets/icons/mail.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addMessage, chatSelector, loadChat, MessageType } from './chatSlice'
import { loginSelector } from '../Login/loginSlice'
import { Message } from './Message/Message'
import { io } from 'socket.io-client'

const Chat: FC<{  }> = ({  }) => {

    const dispatch = useAppDispatch()

    let socket;

    const { messages } = useAppSelector(chatSelector),
            { userName } = useAppSelector(loginSelector)

    const [message, setMessage] = useState<string>('')
    
    console.log('Chat')
    

    socket.on("connect_error", (error) => {
        console.log(error)
    })

    socket.on('chatHistory', (data: MessageType[]) => {
        dispatch(loadChat(data))
    })
    
    socket.on('newMessage', (data: MessageType) => {
        dispatch(addMessage(data))
    })

    const onMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setMessage(value)
    }, [])

    const onEmojiClick = useCallback(() => {

    }, [])

    const onSendClick = useCallback(() => {
        socket.open().emit('newMessage', {message: message, userName: userName})
        setMessage('')
    }, [message, socket, userName])

    useEffect(() => {
        socket = io('ws://localhost:443/', { transports: ['websocket', 'polling', 'flashsocket'] })
    }, [])

    return (
        <section>
            <div className={s.messages}>
                {messages.map((x, i) => <Message key={`${x.userName}${i}`} message={x} mine={x.userName === userName} />).reverse()}
            </div>
            <div className={s.sender}>
                <textarea value={message} onChange={onMessageChange} />
                <div onClick={onEmojiClick}>
                    <img alt="Emodzi" src={emodziIcon} />
                </div>
                <div onClick={onSendClick}>
                    <img alt="Emodzi" src={mail} />
                </div>
            </div>
        </section>
    )
}

export default compose<React.ComponentType>(withAuthRedirect)(Chat)