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
            return 'battle'
        case 20:
            return 'rock'
        case 21:
            return 'tree'
        case 22:
            return 'west-wall'
        case 23:
            return 'north-wall'
        case 24:
            return 'east-wall'
        case 25:
            return 'south-wall'
        case 26:
            return 'south-west-gate'
        case 27:
            return 'south-east-gate'
        case 28:
            return 'north-west-gate'
        case 29:
            return 'north-east-gate'
        case 30:
            return 'south-west-corner'
        case 31:
            return 'south-east-corner'
        case 32:
            return 'north-west-corner'
        case 33:
            return 'north-east-corner'
        case 34:
            return 'boss1'
        case 35:
            return 'boss2'
        case 36:
            return 'boss3'
        case 37:
            return 'boss4'
        case 38:
            return 'boss5'
        case 39:
            return 'boss6'
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