import React from 'react'
import { SPRITE_SIZE } from '../../../../ducks/constants'
import {connect} from 'react-redux'
import './Map.css'

function getTileSprite(type) {
    switch (type) {
        case 0:
            return 'grass'
        case 5:
            return 'rock'
        case 6:
            return 'tree'
        case 7:
            return 'west-wall'
        case 8:
            return 'north-wall'
        case 9:
            return 'east-wall'
        case 10:
            return 'south-wall'
        default:
            return type
    }
}

function MapTile(props) {
    return <div
        className={`tile ${getTileSprite(props.tile)}`}
        style={{
            height: SPRITE_SIZE,
            width: SPRITE_SIZE,
        }}
    />
}

function MapRow(props) {
    return <div className='row'>
        {
            props.tiles.map((tile, i) => <MapTile key={i} tile={tile} />)
        }
    </div>
}

function Map(props) {
    return (
        <div
            style={{
                position: 'relative',
                top: '0px',
                left: '0px',
                width: '880px',
                height: '560px',
                border: '4px solid white',
            }}
        >
            {
                props.tiles.map((row, i) => <MapRow key={i} tiles={row} />)
            }
        </div>
    )
}

function mapStateToProps(state){
    return{
        tiles: state.map.tiles
    }
}

export default connect(mapStateToProps)(Map)