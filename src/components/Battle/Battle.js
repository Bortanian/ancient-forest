import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import { Link } from 'react-router-dom'
import './Battle.css'

class Battle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fightToggle: false,
            enemyHP: null,
            heroHP: null,
            fightText: ''
        }
    }
    componentDidMount() {
        this.setState({
            heroHP: this.props.hero[0].hp,
            enemyHP: this.props.enemy[0].hp,
            fightText: `What will ${this.props.hero[0].name} do?`
        })
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
            return images
        });
        return images
    }
    handleAttack(name, damage, accuracy) {
        setTimeout(() => {
            this.setState({
                fightText: `${this.props.hero[0].name} used ${name}.`
            })
        }, 200);
        setTimeout(() => {
            if (Math.floor(Math.random() * 101) <= accuracy) {
                this.setState({
                    enemyHP: this.state.enemyHP - damage,
                    fightText: `${this.props.hero[0].name}'s attack hit!`
                })
            } else {
                this.setState({
                    fightText: `${this.props.hero[0].name}'s attack missed!`
                })
            }
        }, 1500);
        setTimeout(() => {
            this.checkVictory()
        }, 2500);
        setTimeout(() => {
            this.checkFailure()
        }, 5500);
    }
    checkVictory() {
        if (this.state.enemyHP <= 0) {
            this.setState({
                fightText: `${this.props.enemy[0].name} has been defeated!`
            })
            setTimeout(() => {
                this.setState({
                    fightText: `${this.props.hero[0].name} wins!`
                })
            }, 1000);
            setTimeout(() => {
                this.props.history.push('/game')
                store.dispatch({
                    type: 'TRANSITION_BATTLE',
                    payload: false
                })
            }, 3000);
        } else {
            this.handleEnemyAttack()
        }
    }
    checkFailure() {
        if (this.state.heroHP <= 0) {
            this.setState({
                fightText: `${this.props.hero[0].name} has been defeated!`
            })
            setTimeout(() => {
                this.props.history.push('/select')
                store.dispatch({
                    type: 'TRANSITION_BATTLE',
                    payload: false
                })
                store.dispatch({
                    type: 'TOGGLE_PLAYING',
                    payload: {
                        playing: false
                    }
                })
            }, 3000);
        } else {
            this.setState({
                fightText: `What will ${this.props.hero[0].name} do?`
            })
        }
    }
    handleEnemyAttack() {
        let attackIndex = Math.floor(Math.random() * (this.props.enemy.length))
        let { ability_name, damage, accuracy } = this.props.enemy[attackIndex]
        setTimeout(() => {
            this.setState({
                fightText: `${this.props.enemy[0].name} used ${ability_name}.`
            })
        }, 200);
        setTimeout(() => {
            if (Math.floor(Math.random() * 101) <= accuracy) {
                this.setState({
                    heroHP: this.state.heroHP - damage,
                    fightText: `${this.props.enemy[0].name}'s attack hit!`
                })
            } else {
                this.setState({
                    fightText: `${this.props.enemy[0].name}'s attack missed!`
                })
            }
        }, 1500);
    }
    runAway() {
        store.dispatch({
            type: 'TRANSITION_BATTLE',
            payload: false
        })
    }
    render() {
        const { hero } = this.props
        const images = this.importAll(require.context('../../images', false, /\.(png)$/))
        return (
            <div>
                <div className='battle-view-border'>
                    <div className='battle-view'>
                        <main className='action'>
                            <div className='enemy'>
                                <section className='action-left'>
                                    <div className='healthbar-left'>
                                        <p>{this.state.enemyHP}</p>
                                        <p className='name-left'>{this.props.enemy[0].name}</p>
                                    </div>
                                </section>
                                <section className='action-right'>
                                    <div className='battle-field bf-right'>
                                        <p>{this.props.enemy[0].picture}</p>
                                    </div>
                                </section>
                            </div>

                            <div className='hero'>
                                <section className='action-right'>
                                    <div className='healthbar-right'>
                                        <p className='name-right'>{this.props.hero[0].name}</p>
                                        <p>{this.state.heroHP}</p>
                                    </div>
                                </section>
                                <section className='action-left'>
                                    <div className='battle-field bf-left'>
                                        <img className='action-image' src={images[this.props.hero[0].preview_img]} alt='' />
                                    </div>
                                </section>
                            </div>
                        </main>

                        <div className='lower-action'>
                            <section className='text'>
                                {this.state.fightText}
                            </section>

                            <section className='options'>
                                {!this.state.fightToggle ?
                                    <div>
                                        <button className='fight'
                                            onClick={() => this.setState({ fightToggle: !this.state.fightToggle })}
                                        >FIGHT</button>
                                        <Link to='/game'>
                                            <button className='run' onClick={() => this.runAway()}>RUN</button>
                                        </Link>
                                    </div>
                                    :
                                    <div>
                                        <div>
                                            <button onClick={() =>
                                                this.handleAttack(hero[0].ability_name, hero[0].damage, hero[0].accuracy)}
                                            >{hero[0].ability_name}</button>
                                            <button onClick={() =>
                                                this.handleAttack(hero[1].ability_name, hero[1].damage, hero[1].accuracy)}
                                            >{hero[1].ability_name}</button>
                                            <button onClick={() =>
                                                this.handleAttack(hero[2].ability_name, hero[2].damage, hero[2].accuracy)}
                                            >{hero[2].ability_name}</button>
                                            <button onClick={() =>
                                                this.handleAttack(hero[3].ability_name, hero[3].damage, hero[3].accuracy)}
                                            >{hero[3].ability_name}</button>
                                        </div>
                                        <button onClick={() => this.setState({ fightToggle: !this.state.fightToggle })}>Back</button>
                                    </div>
                                }
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        enemy: state.enemy,
        hero: state.hero,
        battle: state.battle,
        position: state.player.position,
        tiles: state.map.tiles
    }
}

export default connect(mapStateToProps)(Battle)