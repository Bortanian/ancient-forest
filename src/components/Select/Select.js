import React, { Component } from 'react'
import axios from 'axios'
import { getUser } from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Select extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slotVal: [true, true, false],
            characters: []

        }
        this.getUserChars = this.getUserChars.bind(this)
    }
    componentDidMount() {
        this.props.getUser()
        setTimeout(() => {
            this.getUserChars()
        }, 1000)
    }
    getUserChars() {
        const { user } = this.props
        axios.get(`/api/chars/${user.auth_id}`).then(res => {
            this.setState({
                characters: res.data
            })
        })
    }
    deleteChar(id) {
        axios.delete(`/api/chars/${id}`)
        this.getUserChars()
    }
    // For when I add the three slot limit and remove the create character button
    // selectCharacter(slotVal) {
    //     if (!slotVal) {
    //         document.location.href = 'http://localhost:3000/#/create'
    //     } else {

    //     }
    // }
    render() {
        let mappedCharacters = this.state.characters.map((hero, i) => {
            return (
                <section key={hero.id}>
                    <div>
                        <div>
                            <button>PLAY</button>
                            <p>{hero.name}</p>
                            <p>{this.props.class[hero.class]}</p>
                        </div>
                        <button onClick={() => this.deleteChar(hero.id)}>delete</button>
                    </div>
                </section>
            )
        })

        return (
            <div>
                <Link to='/create'>
                    <button>CREATE NEW CHARACTER</button>
                </Link>
                <a href='http://localhost:4545/auth/logout'>
                    <button>LOGOUT</button>
                </a>
                {mappedCharacters}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        class: state.class
    }
}

export default connect(mapStateToProps, { getUser })(Select)