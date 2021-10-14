import React, { FC, memo } from 'react'
import s from './Chat.module.scss'
import { compose } from 'redux'
import withAuthRedirect from '../../HOC/withAuthRedirect'
import emodziIcon from '../../assets/icons/emodziIcon.svg'
import mail from '../../assets/icons/mail.svg'

const Chat: FC<{}> = memo(({  }) => {
    return (
        <section>
            <div className={s.messages}>

            </div>
            <div className={s.sender}>
                <textarea />
                <div>
                    <img alt="Emodzi" src={emodziIcon} />
                </div>
                <div>
                    <img alt="Emodzi" src={mail} />
                </div>
            </div>
        </section>
    )
})

export default compose<React.ComponentType>(withAuthRedirect)(Chat)