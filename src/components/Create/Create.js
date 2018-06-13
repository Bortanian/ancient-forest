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
            preview: ''
        }
    }
    componentDidMount(){
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
            id: this.props.user.id,
            preview_img: this.state.preview
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
    genderCheck(){
        if(this.props.gender[this.state.genderIndex] === "Male"){
            return 'm'
        } else {
            return 'f'
        }
    }
    classCheck(){
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
    styleCheck(){
        switch (this.props.style[this.state.styleIndex]) {
            case 'One':
            return '1'
            case 'Two':
            return '2'
            case 'Three':
            return '3'
            default:
            return ;
        }
    }
    colorCheck(){
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
    checkHero(){
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
        r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); 
        return images
    });
        return images;
    }
    render() {
        const images = this.importAll(require.context('../../images', false, /\.(png)$/));
        return (
            <div>
                <div>
                    <section className='preview'>
                    <img className='preview-image' src={images[this.state.preview]} alt=''/>
                    </section>
                </div>

                <div>
                    <section className='name'>
                        <h3>NAME</h3>
                        <input value={this.state.name} onChange={(e) => this.handleName(e.target.value)} />
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
                        <button onClick={() => this.decStyle()} />
                        {this.props.style[this.state.styleIndex]}
                        <button onClick={() => this.incStyle()} />
                    </section>

                    <section className='color'>
                        <h3>COLOR</h3>
                        <button onClick={() => this.decColor()} />
                        {this.props.color[this.state.colorIndex]}
                        <button onClick={() => this.incColor()} />
                    </section>

                    <section className='gender'>
                        <h3>GENDER</h3>
                        <button onClick={() => this.decGender()} />
                        {this.props.gender[this.state.genderIndex]}
                        <button onClick={() => this.incGender()} />
                    </section>
                </div>

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