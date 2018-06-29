import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Create.css'


class Create extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            classIndex: 0,
            styleIndex: 0,
            colorIndex: 0,
            genderIndex: 0,
            images: {},
            preview: '',
            enterName: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
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
        setTimeout(() => {
            this.checkHero()
        }, 50)
    }
    decGender() {
        if (this.state.genderIndex < 1) {
            this.setState({
                genderIndex: 1
            })
        } else {
            this.setState({
                genderIndex: this.state.genderIndex - 1
            })
        }
        setTimeout(() => {
            this.checkHero()
        }, 50)
    }
    handleName(val) {
        this.setState({
            name: val
        })
    }
    randomName() {
        let gender = this.props.gender[this.state.genderIndex].toLowerCase()
        axios.get(`https://uinames.com/api/?amount=1&gender=${gender}&region=united states`).then(res => {
            this.setState({
                name: res.data.name
            })
        })
    }
    submitCharacter() {
        if (this.state.name === '') {
            alert('please enter a name')
        } else {
            axios.post('/api/chars', {
                name: this.state.name,
                style: this.state.styleIndex,
                color: this.state.colorIndex,
                gender: this.state.genderIndex,
                charClass: this.state.classIndex,
                id: this.props.user.id,
                preview_img: this.state.preview
            }).then(res => {
                if (this.state.classIndex === 0) {
                    axios.post('/api/abilities', {
                        ability: 1,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 4,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 7,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 10,
                        id: res.data[0].id
                    })
                    axios.post('/api/map', {
                        tiles: 0,
                        posX: 400,
                        posY: 240,
                        id: res.data[0].id
                    })
                } else if (this.state.classIndex === 1) {
                    axios.post('/api/abilities', {
                        ability: 2,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 6,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 9,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 10,
                        id: res.data[0].id
                    })
                    axios.post('/api/map', {
                        tiles: 0,
                        posX: 400,
                        posY: 240,
                        id: res.data[0].id
                    })
                } else if (this.state.classIndex === 2) {
                    axios.post('/api/abilities', {
                        ability: 3,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 5,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 8,
                        id: res.data[0].id
                    })
                    axios.post('/api/abilities', {
                        ability: 10,
                        id: res.data[0].id
                    })
                    axios.post('/api/map', {
                        tiles: 0,
                        posX: 400,
                        posY: 240,
                        id: res.data[0].id
                    })
                }

            })
            this.props.history.push('/select')
        }

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
    genderCheck() {
        if (this.props.gender[this.state.genderIndex] === "Male") {
            return 'm'
        } else {
            return 'f'
        }
    }
    classCheck() {
        switch (this.props.class[this.state.classIndex]) {
            case 'Wizard':
                return 'wiz'
            case 'Warrior':
                return 'war'
            case 'Rogue':
                return 'rog'
            default:
                return;
        }
    }
    styleCheck() {
        switch (this.props.style[this.state.styleIndex]) {
            case 'One':
                return '1'
            case 'Two':
                return '2'
            case 'Three':
                return '3'
            default:
                return;
        }
    }
    colorCheck() {
        switch (this.props.color[this.state.colorIndex]) {
            case 'Blue':
                return 'b'
            case 'Red':
                return 'r'
            case 'Green':
                return 'g'
            case 'Yellow':
                return 'y'
            case "Purple":
                return 'p'
            default:
                return;
        }
    }
    checkHero() {
        let g = this.genderCheck()
        let cl = this.classCheck()
        let s = this.styleCheck()
        let co = this.colorCheck()

        this.setState({
            preview: g + cl + s + co + '.png'
        })


    }
    importAll(r) {
        let images = {};
        r.keys().map((item, index) => {
            images[item.replace('./', '')] = r(item);
            return images
        });
        return images;
    }
    render() {
        const images = this.importAll(require.context('../../images', false, /\.(png)$/));
        return (
            <div className='chains-create'>
                <div className='create-box'>
                    <div>
                        <section className='preview'>
                            <img className='preview-image' src={images[this.state.preview]} alt=''/>
                        </section>
                    </div>

                    <div>
                        <section className='name-field'>
                            <h3 className='create-title'>NAME</h3>
                            <input value={this.state.name} onChange={(e) => this.handleName(e.target.value)}  maxLength='12'/>
                            <br />
                            <div className='random' onClick={() => this.randomName()} />
                        </section>

                        <section className='class-field'>
                            <h3 className='create-title'>CLASS</h3>
                            <div className='buttons'>
                                <div className='left' onClick={() => this.decClass()} />
                                <h4>{this.props.class[this.state.classIndex]}</h4>
                                <div className='right' onClick={() => this.incClass()} />
                            </div>
                        </section>

                        <section className='style-field'>
                            <h3 className='create-title'>STYLE</h3>
                            <div className='buttons'>
                                <div className='left' onClick={() => this.decStyle()} />
                                <h4>{this.props.style[this.state.styleIndex]}</h4>
                                <div className='right' onClick={() => this.incStyle()} />
                            </div>
                        </section>

                        <section className='color-field'>
                            <h3 className='create-title'>COLOR</h3>
                            <div className='buttons'>
                                <div className='left' onClick={() => this.decColor()} />
                                <h4>{this.props.color[this.state.colorIndex]}</h4>
                                <div className='right' onClick={() => this.incColor()} />
                            </div>
                        </section>

                        <section className='gender-field'>
                            <h3 className='create-title'>GENDER</h3>
                            <div className='buttons'>
                                <div className='left' onClick={() => this.decGender()} />
                                <h4>{this.props.gender[this.state.genderIndex]}</h4>
                                <div className='right' onClick={() => this.incGender()} />
                            </div>
                        </section>
                    </div>

                    <Link to='/select'>
                        <div className='cancel' onClick={() => this.clearFields()} />
                    </Link>

                    <div className='submit' onClick={() => this.submitCharacter()} />

                </div>
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
        user: state.user,
        tilesIndex: state.map.tilesIndex,
        position: state.player.position
    }
}

export default connect(mapStateToProps)(Create)