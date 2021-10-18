import React, { ChangeEvent, FC, useRef, useCallback, useState, useEffect } from 'react'
import s from './Chat.module.scss'
import { compose } from 'redux'
import withAuthRedirect from '../../HOC/withAuthRedirect'
import emodziIcon from '../../assets/icons/emodziIcon.svg'
import mail from '../../assets/icons/mail.svg'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { addMessage, chatSelector, MessageType } from './chatSlice'
import { loginSelector } from '../Login/loginSlice'
import { Message } from './Message/Message'
import { io } from 'socket.io-client'
import { socket } from '../../WS/socket'
import { LoggedInUser } from './LoggedInUser/LoggedInUser'
import EmojiPicker from 'emoji-picker-react'

const Chat: FC<{}> = ({ }) => {

    const dispatch = useAppDispatch()

    const scrollRef = useRef<HTMLDivElement>(null)

    const { messages } = useAppSelector(chatSelector),
        { userName } = useAppSelector(loginSelector)

    const [message, setMessage] = useState<string>(''),
            [textareaPointStart, setTextAreaPointStart] = useState<number>(0),
            [textareaPointEnd, setTextAreaPointEnd] = useState<number>(0),
            [showEmojiSelect, setShowEmojiSelect] = useState<boolean>(false),
            [loggedInUsers, setLoggedInUsers] = useState<string[]>([])

    const onMessageChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setMessage(value)
    }, [])

    const onBlureEmoji = useCallback(() => {
        setShowEmojiSelect(false)
        const txtarea = document.getElementsByTagName('textarea')[0]
        txtarea.focus()
    }, [])

    const onEmojiClick = useCallback(() => {
        const txtarea = document.getElementsByTagName('textarea')[0]
            setTextAreaPointStart(txtarea.selectionStart)
            setTextAreaPointEnd(txtarea.selectionEnd)
            setShowEmojiSelect(true)
    }, [])

    const onEmojiPickerClick = useCallback((event, emojiObject) => {      
        const txtarea = document.getElementsByTagName('textarea')[0],
                finText = txtarea.value.substring(0, textareaPointStart) + emojiObject.emoji + txtarea.value.substring(textareaPointEnd)   
        setMessage(finText)
        txtarea.focus()     
        txtarea.selectionEnd = ( textareaPointStart === textareaPointEnd )? (textareaPointEnd + emojiObject.emoji.length) : textareaPointEnd
        setShowEmojiSelect(false)
    }, [textareaPointStart, textareaPointEnd])

    const onSendClick = useCallback(() => {
        if (message) {
            socket.emit('newMessage', { message: message, userName: userName, date: new Date() })
            setMessage('')
        }
    }, [message, socket, userName])

    useEffect(() => {
        const socket = io('ws://localhost:443/', { transports: ['websocket', 'polling', 'flashsocket'] })

        socket.on('connect', () => {
            socket.emit('connectedUser', userName)
        })

        socket.on('connectedUser', data => {
            data !== userName && setLoggedInUsers(prev => [...prev, data])
        })

        socket.on("connect_error", (error) => {
            console.log(error)
        })

        socket.on('newMessage', (data: MessageType) => {
            dispatch(addMessage(data))
        })
    }, [])

    useEffect(() => {
        const block = document.getElementById('chatMessagesBlock')
        block && (block.scrollTop = block.scrollHeight)
        scrollRef.current !== null && scrollRef.current.scrollIntoView(false)
    }, [messages, scrollRef])

    return (
        <section>
            <div id={'chatMessagesBlock'} className={s.messages} ref={scrollRef}>
                {messages.map((x, i) => <Message key={`${x.userName}${i}`} message={x} mine={x.userName === userName} />).reverse()}
            </div>
            <div className={s.sender}>
                <textarea id='textarea' value={message} onChange={onMessageChange} />
                <div onClick={onEmojiClick}>
                    <img alt="Emodzi" src={emodziIcon} />
                </div>
                <div onClick={onSendClick}>
                    <img alt="Отправить написанное" src={mail} />
                </div>
                
            </div>
            {showEmojiSelect  && <div className={s.emoji}><div className={s.layout} onClick={onBlureEmoji}></div><EmojiPicker onEmojiClick={onEmojiPickerClick} /></div>}
            <div className={s.loggedInUsers}>
                {loggedInUsers.length ? loggedInUsers.map(x => <LoggedInUser key={x} name={x} setLoggedInUsers={setLoggedInUsers} />) : ''}
            </div>
        </section>
    )
}

export default compose<React.ComponentType>(withAuthRedirect)(Chat)