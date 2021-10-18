import React, { FC, memo, useEffect } from 'react'
import s from './LoggedInUser.module.scss'

export const LoggedInUser: FC<PropTypes> = memo(({ name, setLoggedInUsers }) => {

    useEffect(() => {
        setTimeout(() => {
            setLoggedInUsers(prev => prev.filter(x => x !== name))
        }, 3000)
    }, [])

    return (
        <div className={s.wrapper}>
            Пользователь {name} зашел в чат
        </div>
    )
})

type PropTypes = {
    name: string
    setLoggedInUsers: (value: (prev: string[]) => string[]) => void
}