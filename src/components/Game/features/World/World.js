import React from 'react'
import Player from '../Player/Player'
import Map from '../Map/Map'



function World(props) {

    return (
        <div
            style={{
                position: 'relative',
                width: '880px',
                height: '560px',
                margin: '170px auto',
            }}
        >
            <Map />
            <Player />
        </div>
    )
}

export default World