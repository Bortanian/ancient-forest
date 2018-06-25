import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from '../../ducks/store'
import {Link} from 'react-router-dom'
import {tilesThree} from '../../data/rooms'
import './Battle.css'

class Battle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fightToggle: false,
            enemyName: '',
            enemyHP: null,
            enemyPic: '',
            fightText: ''
        }
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                enemyName: this.props.enemy[0].name,
                enemyHP: this.props.enemy[0].hp,
                enemyPic: this.props.enemy[0].picture,
                fightText: `What will ${this.props.hero[0].name} do?`
            })
        }, 2000);
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); 
        return images
    });
        return images
    }
    handleAttack(name, damage){
        this.setState({
            fightText: ''
        })
        setTimeout(() => {
            this.setState({
                fightText: `${this.props.hero[0].name} used ${name}.`
            })
        }, 200);
        setTimeout(() => {
            this.setState({
                enemyHP: this.state.enemyHP - damage
            })   
        }, 500);
        setTimeout(() => {
            this.checkVictory() 
        }, 1000);
        
    }
    checkVictory(){
        if(this.state.enemyHP <= 0){
            setTimeout(() => {
                this.setState({
                    fightText: `${this.state.enemyName} has been defeated.`
                })
            }, 1000);
            setTimeout(() => {
                this.setState({
                    fightText: `${this.props.hero[0].name} wins.`
                })
            }, 3000);
        }
    }
    runAway(){
        store.dispatch({
            type: 'TRANSITION_BATTLE',
            payload: false
        })
        store.dispatch({
            type: 'TRANSITION_ROOM',
            payload: {
                tiles: tilesThree,
                position: [400, 320]
            }
        })
    }
    render() {
        const {hero} = this.props
        const images = this.importAll(require.context('../../images', false, /\.(png)$/))
        return (
            <div>
                <div className='battle-view'
                    style={{
                        position: 'relative',
                        width: '880px',
                        height: '560px',
                        margin: '170px auto',
                        border: '4px solid white',
                    }}
                >
                    <main className='action'>
                        <div className='enemy'>
                            <section className='action-left'>
                                <p>{this.state.enemyName}</p>
                                <p>{this.state.enemyHP}</p>
                            </section>
                            <section className='action-right'>
                                <p>{this.state.enemyPic}</p>
                            </section>
                        </div>

                        <div className='hero'>
                            <section className='action-right'>
                                <p>{this.props.hero[0].name}</p>
                                <p>{this.props.hero[0].hp}</p>
                            </section>
                            <section className='action-left'>
                                <img className='action-image' src={images[this.props.hero[0].preview_img]} alt=''/>
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
                                <button onClick={() => this.handleAttack(hero[0].ability_name, hero[0].damage)}>{hero[0].ability_name}</button>
                                <button onClick={() => this.handleAttack(hero[1].ability_name, hero[1].damage)}>{hero[1].ability_name}</button>
                                <button onClick={() => this.handleAttack(hero[2].ability_name, hero[2].damage)}>{hero[2].ability_name}</button>
                                <button onClick={() => this.handleAttack(hero[3].ability_name, hero[3].damage)}>{hero[3].ability_name}</button>
                                <button onClick={() => this.setState({ fightToggle: !this.state.fightToggle})}>Back</button>
                            </div>
                            }
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        enemy: state.enemy,
        hero: state.hero,
        battle: state.battle
    }
}

export default connect(mapStateToProps)(Battle)