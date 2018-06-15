import React from 'react'
import Player from '../Player/Player'
import Map from '../Map/Map'
import {tiles} from '../../../../data/map/1'
import store from '../../../../ducks/store'

function World(props) {
    store.dispatch({ type: 'ADD_TILES', payload: {
        tiles,
    }})
    return (
        <div
            style={{
                position: 'relative',
                width: '800px',
                height: '400px',
                margin: '20px auto',
            }}
        >
            <Map />
            <Player />
        </div>
    )
}

export default World