import React from 'react'
import { SPRITE_SIZE } from '../../../../ducks/constants'
import {connect} from 'react-redux'
import './Map.css'

function getTileSprite(type) {
    switch (type) {
        case 0:
            return 'grass'
        case 1:
            return 'transition-south'
        case 2:
            return 'transition-north'
        case 3:
            return 'transition-north'
        case 4:
            return 'transition-south'
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
        case 11:
            return 'south-west-gate'
        case 12:
            return 'south-east-gate'
        case 13:
            return 'north-west-gate'
        case 14:
            return 'north-east-gate'
        case 15:
            return 'south-west-corner'
        case 16:
            return 'south-east-corner'
        case 17:
            return 'north-west-corner'
        case 18:
            return 'north-east-corner'
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