import React from 'react'

export default function Auth(){
    return(
        <div className='login-box'>
            <a href={process.env.REACT_APP_LOGIN}>
                <button>LOGIN</button>
            </a>
        </div> 
    )
}