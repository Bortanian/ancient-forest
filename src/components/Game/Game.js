import React, { Component } from 'react'
import World from './features/World/World'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import './Game.css'


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingToggle: true,
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (!this.props.playing) {
                let { map_id, pos_x, pos_y } = this.props.hero[0]
                store.dispatch({
                    type: 'TRANSITION_ROOM',
                    payload: {
                        tilesIndex: map_id,
                        tiles: store.getState().map.tiles,
                        position: [pos_x, pos_y]
                    }
                })
                store.dispatch({
                    type: 'TOGGLE_PLAYING',
                    payload: true
                })
                this.setState({
                    loadingToggle: false
                })
            } else {
                this.setState({
                    loadingToggle: false
                })
            }
        }, 1000);
    }
    handleMenuToggle() {
        store.dispatch({
            type: 'TOGGLE_MENU',
            payload: !this.props.menu
        })
    }
    render() {
        return (
            <div className='view-port'>
                <div className='view-port-border'>
                    <div className='menu-button'>
                        <div onClick={() => this.handleMenuToggle()}>MENU</div>
                    </div>
                    <div className='save-message'>
                        {this.props.savedMessage ?
                            <div>
                                <h3>GAME SAVED!</h3>
                            </div>
                            :
                            <div></div>
                        }
                    </div>
                    <div>
                        {this.state.loadingToggle ?
                            <div className='loading'>
                                <h2 className='loading-text'>LOADING</h2>
                            </div>
                            :
                            <World />
                        }
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        hero: state.hero,
        playing: state.playing,
        menu: state.menu,
        savedMessage: state.savedMessage,
    }
}


export default connect(mapStateToProps)(Game)