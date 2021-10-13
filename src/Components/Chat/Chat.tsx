import React, { FC, memo } from 'react'
import s from 'Chat.module.scss'
import { compose } from 'redux'
import withAuthRedirect from '../../HOC/withAuthRedirect'

const Chat: FC<{}> = memo(({  }) => {
    return (
        <section>

        </section>
    )
})

export default compose<React.ComponentType>(withAuthRedirect)(Chat)