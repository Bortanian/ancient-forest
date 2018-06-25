import axios from 'axios'

const initialState = {
    user: {},
    player:{
        position:[400,240]
    },
    map:{
        tiles: [],
    },
    hero: {},
    enemy:{},
    color: ['Blue', 'Red', 'Green', 'Yellow', 'Purple'],
    style: ['One', 'Two', 'Three'],
    class: ['Wizard', 'Warrior', 'Rogue'],
    gender: ['Male', 'Female'],
    battle: false

}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_ENEMY = 'GET_ENEMY'
const UPDATE_CURRENT_HERO = 'UPDATE_CURRENT_HERO'

export function getUser() {
    let userData = axios.get('/auth/user').then(res => res.data)
    return {
        type: GET_USER_DATA,
        payload: userData
    }
}

export function getEnemy(id) {
    let enemyData = axios.get(`/api/enemy/${id}`).then(res => res.data)
    return {
        type: GET_ENEMY,
        payload: enemyData
    }
}

export function updateCurrentHero(id){
    let heroData = axios.get(`/api/hero/${id}`).then(res => res.data)
    return {
        type: UPDATE_CURRENT_HERO,
        payload: heroData
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case 'MOVE_PLAYER':
            return Object.assign({}, state, {player: action.payload})
        case 'ADD_TILES':
            return Object.assign({}, state, {map: action.payload})
        case 'TRANSITION_ROOM':
            return Object.assign({}, state, {
                map: action.payload,
                player: action.payload
            })
        case 'TRANSITION_BATTLE':
            return Object.assign({}, state, {battle: action.payload})
        case GET_ENEMY + '_FULFILLED':
            return Object.assign({}, state, {enemy: action.payload})
        case UPDATE_CURRENT_HERO + '_FULFILLED':
            return Object.assign({}, state, {hero: action.payload})
        default:
            return state;
    }
}
