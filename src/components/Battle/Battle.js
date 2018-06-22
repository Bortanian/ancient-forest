import React, { Component } from 'react'
import './Battle.css'

export default class Battle extends Component {
    constructor() {
        super()
        this.state = {
            fightToggle: false
        }
    }
    render() {
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
                    </main>

                    <div className='lower-action'>
                        <section className='text'>
                        </section>

                        <section className='options'>
                            <button className='fight'
                                onClick={() => this.setState({ fightToggle: !this.state.fightToggle })}
                                >FIGHT</button>
                            <button className='run'>RUN</button>
                        </section>
                    </div>
                </div>
            </div>
        )
    }
}