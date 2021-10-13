import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootState } from '../store/store'

let mapStateToPropsForRedirect = (state: RootState) => ({
    isAuth: state.login.isAuth
} as const)

export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {

    

    const RedirectComponent: React.FC<MapPropsType> = (props) => {

            let {isAuth, ...restProps } = props

            if (!isAuth) return <Redirect to={'/auth'} />
            
            return <Component {...restProps as WCP} />
    }
    
    let ConnectedAuthRedirectComponent = connect<MapPropsType, {}, WCP, RootState>(mapStateToPropsForRedirect, {})(RedirectComponent)

    return ConnectedAuthRedirectComponent
}

export default withAuthRedirect

type MapPropsType = {
    isAuth: boolean
}