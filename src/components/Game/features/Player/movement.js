import store from '../../../../ducks/store'
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../../../ducks/constants'
import { tilesOne, tilesTwo, tilesThree } from '../../../../data/rooms'

export default function handleMovement(player) {

    function getNewPosition(oldPos, direction) {
        switch (direction) {
            case 'WEST':
                return [oldPos[0] - SPRITE_SIZE, oldPos[1]]
            case 'EAST':
                return [oldPos[0] + SPRITE_SIZE, oldPos[1]]
            case 'NORTH':
                return [oldPos[0], oldPos[1] - SPRITE_SIZE]
            case 'SOUTH':
                return [oldPos[0], oldPos[1] + SPRITE_SIZE]
            default:
                return direction
        }
    }

    function observeBoundaries(oldPos, newPos) {
        return (newPos[0] >= 0 && newPos[0] <= MAP_WIDTH - SPRITE_SIZE) &&
            (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    }

    function observeImpassable(oldPos, newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        return nextTile < 20
    }

    function dispatchMove(newPos) {
        const tiles = store.getState().map.tiles
        const y = newPos[1] / SPRITE_SIZE
        const x = newPos[0] / SPRITE_SIZE
        const nextTile = tiles[y][x]
        switch (nextTile) {
            case 1:
                //FROM ROOM 2 TO 1
                return store.dispatch({
                    type: 'TRANSITION_ROOM',
                    payload: {
                        tiles: tilesOne,
                        position: [400, 80]
                    }
                })
            case 2:
                //FROM ROOM 1 TO 2
                return store.dispatch({
                    type: 'TRANSITION_ROOM',
                    payload: {
                        tiles: tilesTwo,
                        position: [400, 400]
                    }
                })
            case 3:
                //FROM ROOM 2 TO 3
                return store.dispatch({
                    type: 'TRANSITION_ROOM',
                    payload: {
                        tiles: tilesThree,
                        position: [400, 400]
                    }
                })
            case 4:
                //FROM ROOM 3 to 2
                return store.dispatch({
                    type: 'TRANSITION_ROOM',
                    payload: {
                        tiles: tilesTwo,
                        position: [400, 80]
                    }
                })
            case 5:
                return store.dispatch({
                    type: 'TRANSITION_BATTLE',
                    payload: true
                })
            default:
                return store.dispatch({
                    type: 'MOVE_PLAYER',
                    payload: {
                        position: newPos
                    }
                })
        }
    }

    function attemptMove(direction) {
        const oldPos = store.getState().player.position
        const newPos = getNewPosition(oldPos, direction)

        if (observeBoundaries(oldPos, newPos) && observeImpassable(oldPos, newPos))
            dispatchMove(newPos)
    }

    function handleKeyDown(e) {
        // e.preventDefault()

        switch (e.keyCode) {
            case 37:
                return attemptMove('WEST')
            case 38:
                return attemptMove('NORTH')
            case 39:
                return attemptMove('EAST')
            case 40:
                return attemptMove('SOUTH')
            default:
                return e.keyCode
        }
    }

    window.addEventListener('keydown', (e) => {
        handleKeyDown(e)
    })
    return player
}