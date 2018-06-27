import React, { Component } from 'react'
import { connect } from 'react-redux'
import handleMovement from './movement'
// import { Link } from 'react-router-dom'
import { getEnemy } from '../../../../ducks/reducer'
import store from '../../../../ducks/store'
import {withRouter} from 'react-router-dom'




class Player extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    handleCancel() {
        store.dispatch({
            type: 'TRANSITION_BATTLE',
            payload: false
        })
    }
    handleBattle() {
        this.props.getEnemy(1)
        setTimeout(() => {
            this.props.history.push('/battle')
        }, 1000);
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
            return images
        });
        return images
    }
    render() {
        const images = this.importAll(require.context('../../../../images', false, /\.(png)$/))
        return (
            <div>
                <div
                    style={{
                        position: 'absolute',
                        top: this.props.position[1],
                        left: this.props.position[0],
                        transitionDuration: '.25s',
                        transitionProperty: 'top left',
                        backgroundImage: `url('${images[this.props.hero[0].preview_img]}')`,
                        backgroundSize: '80px',
                        backgroundPosition: '0 0',
                        width: '80px',
                        height: '80px',
                    }}
                />
                {this.props.battle ?
                    <div>
                        <button onClick={() => this.handleBattle()}>Battle</button>
                        <button onClick={() => this.handleCancel()}>Cancel</button>
                    </div>
                    : ''}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.player,
        battle: state.battle,
        enemy: state.enemy,
        hero: state.hero
    }
}

export default connect(mapStateToProps, { getEnemy })(handleMovement(withRouter(Player)))