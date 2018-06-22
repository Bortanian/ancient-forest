import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Auth from './components/Auth/Auth'
import Create from './components/Create/Create'
import Game from './components/Game/Game'
import Select from './components/Select/Select'
import Battle from './components/Battle/Battle'

export default (
    <Switch>
        <Route exact path='/' component={Auth}/>
        <Route path='/select' component={Select}/>
        <Route path='/create' component={Create}/>
        <Route path='/game' component={Game}/>
        <Route path='/battle' component={Battle}/>
    </Switch>
)