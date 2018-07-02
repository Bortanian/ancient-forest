import axios from 'axios'
import {tilesOne, tilesTwo, tilesThree} from '../data/rooms'

const ROOM_ARRAY = [tilesOne, tilesTwo, tilesThree]

const initialState = {
    user: {},
    player:{
        position:[400,240]
    },
    map:{
        tilesIndex:0,
        tiles: ROOM_ARRAY
    },
    hero: {},
    enemy:{},
    color: ['Blue', 'Red', 'Green', 'Yellow', 'Purple'],
    style: ['One', 'Two', 'Three'],
    class: ['Wizard', 'Warrior', 'Rogue'],
    gender: ['Male', 'Female'],
    battle: false,
    menu: false,
    playing: false,
    savedMessage: false

}

const GET_USER_DATA = 'GET_USER_DATA'
const GET_ENEMY = 'GET_ENEMY'
const UPDATE_CURRENT_HERO = 'UPDATE_CURRENT_HERO'
const UPDATE_HERO_POSITION = 'UPDATE_HERO_POSITION'

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
        payload: heroData,
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
            return Object.assign({}, state, {
                hero: action.payload
            })
        case 'TOGGLE_MENU':
            return Object.assign({}, state, {menu: action.payload})
        case UPDATE_HERO_POSITION + '_FULFILLED':
            console.log(action.payload)
            return Object.assign({}, state, {
                map: action.payload,
                player: action.payload
            })
        case 'TOGGLE_PLAYING':
            return Object.assign({}, state, {playing: action.payload})
        case 'SAVE_MESSAGE':
            return Object.assign({}, state, {savedMessage: action.payload})
        default:
            return state;
    }
}
