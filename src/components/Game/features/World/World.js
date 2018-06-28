import React, { Component } from 'react'
import Player from '../Player/Player'
import Map from '../Map/Map'
import './World.css'



class World extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    render() {
        return (
            < div className='world'>
                <Map />
                <Player />
            </div >
        )
    }
}


export default World