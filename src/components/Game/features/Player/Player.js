import React from 'react'
import { connect } from 'react-redux'
import walkSprite from './player_walkx2.png'
import handleMovement from './movement'
import { Link } from 'react-router-dom'
import { getEnemy } from '../../../../ducks/reducer'
import store from '../../../../ducks/store'

function handleCancel(){
    store.dispatch({
        type: 'TRANSITION_BATTLE',
        payload: false
    })
}

function Player(props) {
    return (
        <div>
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
            {props.battle ?
                <div>
                    <Link to='/battle'>
                        <button onClick={() => props.getEnemy(1)}>Battle</button>
                    </Link>
                    <button onClick={() => handleCancel()}>Cancel</button>
                </div>
                : ''}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        ...state.player,
        battle: state.battle
    }
}

export default connect(mapStateToProps, { getEnemy })(handleMovement(Player))