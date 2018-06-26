import React, { Component } from 'react'
import store from '../../../../ducks/store'
import Player from '../Player/Player'
import Map from '../Map/Map'
import './World.css'
import { connect } from 'react-redux';



class World extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleMenuToggle(){
        store.dispatch({
            type: 'TOGGLE_MENU',
            payload: !this.props.menu
        })
    }
    render() {
        return (
            < div
                style={{
                    position: 'relative',
                    width: '880px',
                    height: '560px',
                    margin: '170px auto',
                }
                }
            >
                <div className='menu-button'>
                    <button onClick={() => this.handleMenuToggle()}>MENU</button>
                </div>
                <Map />
                <Player />
            </div >
        )
    }
}

function mapStateToProps(state){
    return{
        menu: state.menu
    }
}

export default connect(mapStateToProps)(World)