import React from 'react'
import './Auth.css'

export default function Auth(){
    return(
        <div className='login-box'>
            <a href={process.env.REACT_APP_LOGIN}>
                <h2 className='login'>LOGIN</h2>
            </a>
        </div> 
    )
}