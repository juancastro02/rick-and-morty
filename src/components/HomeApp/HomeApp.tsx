import React from 'react'
import './HomeApp.css'
import AppRouter from '../../router/AppRouter';

const HomeApp = (): JSX.Element => {

    //On the Home screen, the component will be rendered depending on the path

    return (
        <div className="home-container">
            <div className="title-container">
                <span>The Rick and Morty App </span>
            </div>
            <div className="paginator-container" >
                <AppRouter/>
            </div>
        </div>
    )
}

export default HomeApp
