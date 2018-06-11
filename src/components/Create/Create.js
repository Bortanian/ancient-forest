import React, {Component} from 'react'

export default class Create extends Component{
    constructor(){
        super()
        this.state = {
            
        }
    }
    render(){
        return(
            <div>
                <section className='preview'>
                    <img alt=''/>
                </section>

                <section className='name'>
                <button></button>
                <h3>NAME</h3>
                <button></button>
                </section>

                <section className='class'>
                <button></button>
                <h3>CLASS</h3>
                <button></button>
                </section>

                <section className='style'>
                <button></button>
                <h3>STYLE</h3>
                <button></button>
                </section>

                <section className='color'>
                <button></button>
                <h3>COLOR</h3>
                <button></button>
                </section>

                <section className='gender'>
                <h3>GENDER</h3>
                <button></button>
                <button></button>
                </section>


            </div> 
        )
    }
}