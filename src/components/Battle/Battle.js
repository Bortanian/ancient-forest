import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import { Link } from 'react-router-dom'
import './Battle.css'
import hpCapRight from './hpcap-right.png'
import hpCapLeft from './hpcap-left.png'
import health from './health.png'

class Battle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fightToggle: false,
            actionToggle: false,
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
                fightText: `${this.props.hero[0].name} used ${name}.`,
                fightToggle: false,
                actionToggle: true
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
                actionToggle: false,
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
                                        <div />
                                        <div className='hpcontainter-left'>
                                            {this.state.enemyHP === 100 ?
                                                <div className='hp-left'
                                                    style={{
                                                        backgroundImage: `url(${hpCapLeft})`,
                                                        backgroundSize: '100%',
                                                        width: '255px',
                                                    }}
                                                />
                                                :
                                                <div className='hp-left'
                                                    style={{
                                                        backgroundImage: `url(${health})`,
                                                        backgroundRepeat: 'repeat-x',
                                                        width: `${this.state.enemyHP}%`,
                                                        transitionProperty: 'width',
                                                        transitionDelay: '.25s'
                                                    }}
                                                />
                                            }
                                        </div>
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
                                        <div className='hpcontainer-right'>
                                            {this.state.heroHP === 100 ?
                                                <div className='hp-right'
                                                    style={{
                                                        backgroundImage: `url(${hpCapRight})`,
                                                        backgroundSize: '100%',
                                                        width: '255px',
                                                    }}
                                                />
                                                :
                                                <div className='hp-right'
                                                    style={{
                                                        backgroundImage: `url(${health})`,
                                                        width: `${this.state.heroHP}%`,
                                                        backgroundRepeat: 'repeat-x',
                                                        transitionProperty: 'width',
                                                        transitionDelay: '.25s'
                                                    }}
                                                />
                                            }
                                        </div>
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
                            {!this.state.fightToggle ?
                                <div>
                                    <section className='text'>
                                        {this.state.fightText}
                                    </section>
                                    {!this.state.actionToggle ?
                                        <section className='options'>

                                            <div className='options-buttons'>
                                                <h4 className='fight'
                                                    onClick={() => this.setState({ fightToggle: !this.state.fightToggle })}
                                                >FIGHT</h4>
                                                <Link to='/game'>
                                                    <h4 className='run' onClick={() => this.runAway()}>RUN</h4>
                                                </Link>
                                            </div>
                                        </section>
                                        :
                                        <div>
                                        </div>
                                    }
                                </div>
                                :
                                <div>
                                    <div className='abilities'>
                                        <h4 className='ability-buttons' onClick={() =>
                                            this.handleAttack(hero[0].ability_name, hero[0].damage, hero[0].accuracy)}
                                        >{hero[0].ability_name}</h4>
                                        <h4 className='ability-buttons' onClick={() =>
                                            this.handleAttack(hero[1].ability_name, hero[1].damage, hero[1].accuracy)}
                                        >{hero[1].ability_name}</h4>
                                        <h4 className='ability-buttons' onClick={() =>
                                            this.handleAttack(hero[2].ability_name, hero[2].damage, hero[2].accuracy)}
                                        >{hero[2].ability_name}</h4>
                                        <h4 className='ability-buttons' onClick={() =>
                                            this.handleAttack(hero[3].ability_name, hero[3].damage, hero[3].accuracy)}
                                        >{hero[3].ability_name}</h4>
                                    </div>
                                    <div className='ability-back' onClick={() => this.setState({ fightToggle: !this.state.fightToggle })}></div>
                                </div>
                            }
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