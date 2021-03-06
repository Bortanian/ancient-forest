import React, { Component } from 'react'
import axios from 'axios'
import { getUser, updateCurrentHero} from '../../ducks/reducer'
import { connect } from 'react-redux'
import { Link} from 'react-router-dom'
import './Select.css'

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
        }, 200)
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
        axios.delete(`/api/abilities/${id}`)
        axios.delete(`/api/map/${id}`)
        this.getUserChars()
    }
    handlePlay(id){
        this.props.updateCurrentHero(id)
    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
            return images
        });
        return images
    }
    // For when I add the three slot limit and remove the create character button
    // selectCharacter(slotVal) {
    //     if (!slotVal) {
    //         document.location.href = 'http://localhost:3000/#/create'
    //     } else {

    //     }
    // }
    render() {
        const images = this.importAll(require.context('../../images', false, /\.(png)$/))
        let mappedCharacters = this.state.characters.map((hero, i) => {
            return (

                <section key={hero.id} className='select-box'>
                    <div className='select-contents'>
                        <div>
                            <div className='img-border'>
                            <img className='preview-img' src={images[hero.preview_img]} alt='' />   
                            </div> 
                            <p className='name-title'>{hero.name} The {this.props.class[hero.class]}</p>
                            <Link to='/game'>
                                <h2 className='play' onClick={() => this.handlePlay(hero.id)}>PLAY</h2>
                            </Link>
                        </div>
                        <div className='delete' onClick={() => this.deleteChar(hero.id)}></div>
                    </div>
                </section>
            )
        })

        return (
            <div className='chains'>
                <div className='select-buttons'>
                    <Link to='/create'>
                        <h3 className='select-top create'>CREATE</h3>
                    </Link>
                    <a href={process.env.REACT_APP_LOGOUT}>
                        <div className='select-top right-logout'>
                        <h3 className='logout'>LOGOUT</h3>
                        <img className='user-icon' src={`https://avatars.dicebear.com/v2/identicon/${this.props.user.id}.svg`} alt=''/>   
                        </div> 
                    </a>
                </div>
                <div>
                    <h2 className='select-hero'>SELECT YOUR HERO</h2>
                </div>
                {mappedCharacters}
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        class: state.class,
        hero: state.hero
    }
}

export default connect(mapStateToProps, { getUser, updateCurrentHero})(Select)