import React from 'react'
import './Auth.css'

export default function Auth() {
    return (
        <div>
            <div className='auth-box'>
                <h1>WELCOME TO THE ANCIENT FOREST</h1>
            <a href={process.env.REACT_APP_LOGIN}>
                <div className='login-box'>
                    <h2 className='login'>LOGIN</h2>
                </div>
            </a>
            </div>
        </div>
    )
}