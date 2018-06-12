import React, { Component } from 'react'
import { connect } from 'react-redux'

class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            classIndex: 0,
            styleIndex: 0,
            colorIndex: 0,
            genderIndex: 0
        }
    }

    incClass() {
        if (this.state.classIndex > 1) {
            this.setState({
                classIndex: 0
            })
        } else {
            this.setState({
                classIndex: this.state.classIndex + 1
            })
        }
    }
    decClass() {
        if (this.state.classIndex < 1) {
            this.setState({
                classIndex: 2
            })
        } else {
            this.setState({
                classIndex: this.state.classIndex - 1
            })
        }
    }
    incStyle() {
        if (this.state.styleIndex > 1) {
            this.setState({
                styleIndex: 0
            })
        } else {
            this.setState({
                styleIndex: this.state.styleIndex + 1
            })
        }
    }
    decStyle() {
        if (this.state.styleIndex < 1) {
            this.setState({
                styleIndex: 2
            })
        } else {
            this.setState({
                styleIndex: this.state.styleIndex - 1
            })
        }
    }
    incColor() {
        if (this.state.colorIndex > 3) {
            this.setState({
                colorIndex: 0
            })
        } else {
            this.setState({
                colorIndex: this.state.colorIndex + 1
            })
        }
    }
    decColor() {
        if (this.state.colorIndex < 1) {
            this.setState({
                colorIndex: 4
            })
        } else {
            this.setState({
                colorIndex: this.state.colorIndex - 1
            })
        }
    }

    render() {
        return (
            <div>
                <section className='preview'>
                    <img alt='' />
                </section>

                <section className='name'>
                    <h3>NAME</h3>
                    <input />
                    <button>RANDOM</button>
                </section>

                <section className='class'>
                    <h3>CLASS</h3>
                    <button onClick={() => this.decClass()} />
                    {this.props.class[this.state.classIndex]}
                    <button onClick={() => this.incClass()} />
                </section>

                <section className='style'>
                    <h3>STYLE</h3>
                    <button onClick={() => this.decStyle()}/>
                    {this.props.style[this.state.styleIndex]}
                    <button onClick={() => this.incStyle()}/>
                </section>

                <section className='color'>
                    <h3>COLOR</h3>
                    <button onClick={() => this.decColor()}/>
                    {this.props.color[this.state.colorIndex]}
                    <button onClick={() => this.incColor()}/>
                </section>

                <section className='gender'>
                    <h3>GENDER</h3>
                    <button></button>
                    <button></button>
                </section>

                <button>CREATE CHARACTER</button>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        color: state.color,
        style: state.style,
        class: state.class,
        gender: state.gender
    }
}

export default connect(mapStateToProps)(Create)