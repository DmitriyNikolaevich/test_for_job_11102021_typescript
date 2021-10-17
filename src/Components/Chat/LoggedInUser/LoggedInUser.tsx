import React, { ChangeEvent, FC, memo, useCallback, useState, useEffect } from 'react'
import s from './LoggedInUser.module.scss'

export const LoggedInUser: FC<{ name: string, setLoggedInUsers: (value: (prev: string[]) => string[]) => void }> = memo(({ name, setLoggedInUsers }) => {

    useEffect(() => {
        setTimeout(() => {
            setLoggedInUsers(prev => prev.filter(x => x !== name))
        }, 3000)
    }, [])

    return (
        <div className={s.wrapper}>
            {name}
        </div>
    )
})