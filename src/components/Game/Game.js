import React, { Component } from 'react'
import World from './features/World/World'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import './Game.css'


class Game extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingToggle: true
        }
    }
    componentDidMount() {
        setTimeout(() => {
            let {map_id, pos_x, pos_y} = this.props.hero[0]
            store.dispatch({
                type: 'TRANSITION_ROOM',
                payload: {
                    tilesIndex: map_id,
                    tiles: store.getState().map.tiles,
                    position: [pos_x, pos_y]
                }
            })
            this.setState({
                loadingToggle: false
            })
        }, 1000);
    }
    render() {
        return (
            <div className='view-port'>
                {this.state.loadingToggle ? 
                    <div className='loading'/>
                        :
                <World />
                }
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        hero: state.hero
    }
}


export default connect(mapStateToProps)(Game)