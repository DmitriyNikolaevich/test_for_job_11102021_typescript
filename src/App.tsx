import React, { FC, memo, lazy } from 'react'
import './App.module.scss'
import { Redirect, Route, Switch } from 'react-router'
import { Login } from './Components/Login/Login'
import { withSuspend } from './HOC/withSuspend'

const ChatLazy = lazy(() => import('./Components/Chat/Chat')),
      SuspendedCats = withSuspend(ChatLazy)

export const App: FC<{  }> = memo(({  }) => {
  return (
    <main>
      <Switch>
        <Route exact render={() => <Redirect to={'/auth'} />} path='/' />
        <Route render={() => <Login />} path='/auth' />
        <Route render={() => <SuspendedCats />} path='/chat' />
      </Switch>
    </main>
  )
})