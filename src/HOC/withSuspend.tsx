import React from 'react'
import preloader from '../assets/gifs/preloader.gif'

export function withSuspend<WCP>(Component: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return <React.Suspense fallback={<img src={preloader} alt="Alt text" />}>
                    <Component {...props} />
               </React.Suspense>
    }
}