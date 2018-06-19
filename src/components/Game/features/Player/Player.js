import React from 'react'
import {connect} from 'react-redux'
import walkSprite from './player_walkx2.png'
import handleMovement from './movement'

function Player(props) {
    
    return(
        <div
            style={{
                position: 'absolute',
                top: props.position[1],
                left: props.position[0],
                backgroundImage: `url('${walkSprite}')`,
                backgroundPosition: '0 0',
                width: '80px',
                height: '80px',
            }}
        /> 
    )
}

function mapStateToProps(state){
    return{
        ...state.player,
    }
}

export default connect(mapStateToProps)(handleMovement(Player))