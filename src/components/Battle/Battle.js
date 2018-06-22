import React, {Component} from 'react'

export default class Battle extends Component{
    render(){
        return(
            <div>
                BATTLE COMPONENT
                <div className='battle-view'>
                    <main className='action'>
                    </main>

                    <section className='text'>
                    </section>

                    <section className='options'>
                        <button className='fight'>FIGHT</button>
                        <button className='run'>RUN</button>
                    </section>
                </div>
            </div>
        )
    }
}