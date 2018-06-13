import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'


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
    incGender() {
        if (this.state.genderIndex > 0) {
            this.setState({
                genderIndex: 0
            })
        } else {
            this.setState({
                genderIndex: this.state.genderIndex + 1
            })
        }
    }
    decGender() {
        if (this.state.genderIndex > 0) {
            this.setState({
                genderIndex: 1
            })
        } else {
            this.setState({
                genderIndex: this.state.genderIndex - 1
            })
        }
    }
    handleName(val){
        this.setState({
            name: val
        })
    }
    randomName() {
        let gender = this.props.gender[this.state.genderIndex].toLowerCase()
        axios.get(`https://uinames.com/api/?amount=1&gender=${gender}&region=united states`).then(res => {
            console.log(res.data)
            this.setState({
                name: res.data.name
            })
        })
    }
    submitCharacter() {
        axios.post('/api/chars', {
            name: this.state.name,
            style: this.state.styleIndex,
            color: this.state.colorIndex,
            gender: this.state.genderIndex,
            charClass: this.state.classIndex,
            id: this.props.user.id
        })
    }
    clearFields() {
        this.setState({
            name: '',
            styleIndex: 0,
            colorIndex: 0,
            genderIndex: 0,
            classIndex: 0
        })
    }

    render() {
        return (
            <div>
                <section className='preview'>
                    <img alt='' />
                </section>

                <section className='name'>
                    <h3>NAME</h3>
                    <input value={this.state.name} onChange={(e) => this.handleName(e.target.value)}/>
                    <button onClick={() => this.randomName()}>RANDOM</button>
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
                    <button onClick={() => this.decGender()}/>
                    {this.props.gender[this.state.genderIndex]}
                    <button onClick={() => this.incGender()}/>
                </section>

                <Link to='/select'>
                    <button onClick={() => this.clearFields()}>CANCEL</button>
                </Link>

                <Link to='/select'>
                <button onClick={() => this.submitCharacter()}>CREATE CHARACTER</button>
                </Link>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        color: state.color,
        style: state.style,
        class: state.class,
        gender: state.gender,
        user: state.user
    }
}

export default connect(mapStateToProps)(Create)