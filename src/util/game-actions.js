import { PLAYER_OKS, PLEYER_EKS, ROWS } from './game-constants'

export const unblockBoard = (board) => {
    return board.map((element) => {
        return element.map((item) => {
            item.disabled = !!item.player;
            return item;
        });
    });
}

export const eksTurn = (players) => {
    players.eks.onTurn = true
    players.oks.onTurn = false
    return players
}

export const oksTurn = (players) => {
    players.oks.onTurn = true
    players.eks.onTurn = false
    return players
}

export const playerOnTurn = (players) => {
    return players.eks.onTurn ? players.eks : players.oks
}

export const endTurn = (players) => {
    return players.eks.onTurn ? oksTurn(players) : eksTurn(players)
}

export const placeBallInCentar = (board) => {
    return board.map((element) => {
        return element.map((item) => {
            if (item.id === "H10") {
                item.ball = true;
            }
            return item;
        });
    });
}

export const setPlayerPice = (tileId, board) => {
    return board.map(element => {
        return element.map((item) => {
            if (item.id === tileId) {
                item.disabled = true
                item.player = true
            }
            return item
        })
    })
}

export const setMoveInHistory = (tileId, playerName, history) => {
    return history.concat({ name: playerName, tileId: tileId })
}

export const tryJump = (board, selectedCords) => {
    let ballPosition = {}
    board.map(element => {
        element.find(item => { if (item.ball) ballPosition = item })
    })
    const cords = { rowIdx: selectedCords.row, colIdx: selectedCords.col, ballRowIdx: ballPosition.row, ballColIdx: ballPosition.col }

    const colJumpMagnitude = Math.abs(cords.colIdx - cords.ballColIdx)
    const rowJumpMagnitude = Math.abs(cords.rowIdx - cords.ballRowIdx)

    if (cords.rowIdx === cords.ballRowIdx) {
        return tryJumpHorizontal(board, cords)
    }
    else if (cords.colIdx === cords.ballColIdx) {
        return tryJumpVertical(board, cords)
    }
    else if (colJumpMagnitude === rowJumpMagnitude) {
        return tryDiagonalJump(board, cords)
    } else {
        return false
    }


}

const tryJumpHorizontal = (board, cords) => {
    const maxRowIdx = Math.max(cords.ballColIdx, cords.colIdx)
    const minRowIdx = Math.min(cords.ballColIdx, cords.colIdx)

    // Jump on next left or right not allowed
    if (cords.ballColIdx + 1 === cords.colIdx) return false
    if (cords.ballColIdx - 1 === cords.colIdx) return false

    console.log('----- HORIZONTAL MOVE -----')
    console.log(`Max: ${maxRowIdx} Min: ${minRowIdx}`)
    for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
        const hasPlayer = board[cords.rowIdx][idx].player === true
        console.log(`INDEX: ${idx}  HASPLAYER: ${hasPlayer}`)
        if (!hasPlayer) return false
    }
    console.log("EXITED")

    for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
        board[cords.rowIdx][idx].player = false
    }

    board[cords.ballRowIdx][cords.ballColIdx].ball = false
    board[cords.rowIdx][cords.colIdx].ball = true

    return board
}

const tryJumpVertical = (board, cords) => {
    const maxColIdx = Math.max(cords.ballRowIdx, cords.rowIdx)
    const minColIdx = Math.min(cords.ballRowIdx, cords.rowIdx)

    // Jump on next up or down tile not allowed
    if (cords.ballRowIdx + 1 === cords.rowIdx) return false
    if (cords.ballRowIdx - 1 === cords.rowIdx) return false


    console.log('----- VERTICAL MOVE -----')
    console.log(`Max: ${maxColIdx} Min: ${minColIdx}`)
    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
        const hasPlayer = board[idx][cords.colIdx].player === true
        console.log(`INDEX: ${idx}  HASPLAYER: ${hasPlayer}`)
        if (!hasPlayer) return false
    }
    console.log("EXITED")

    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
        board[idx][cords.colIdx].player = false
        console.log(`Remove Player at index: ${idx}`)
    }

    board[cords.ballRowIdx][cords.ballColIdx].ball = false
    board[cords.rowIdx][cords.colIdx].ball = true
    return board
}

const tryDiagonalJump = (board, cords) => {
    const colComparator = cords.colIdx > cords.ballColIdx ? '<' : '>'
    const colOperator = cords.colIdx > cords.ballColIdx ? '+' : '-'
    const rowComparator = cords.rowIdx > cords.ballRowIdx ? '<' : '>'
    const rowOperator = cords.rowIdx > cords.ballRowIdx ? '+' : '-'

    console.log('----- DIAGONAL MOVE MOVE -----')


    console.log(`Ball Cords Y: ${cords.ballColIdx}, X:${cords.ballRowIdx}`)
    console.log(`Selected Cords Y: ${cords.colIdx}, X: ${cords.rowIdx}`)

    console.log(`Col Comparator: ${colComparator} Col Operator: ${colOperator}`)
    console.log(`Row Comparator: ${rowComparator} Row Operator: ${rowOperator}`)

    // jump on next diagonal tile on all 4 sides are not allwed
    if (Math.abs(cords.rowIdx - cords.ballRowIdx) === 1) return false

    // do not check field where ball is
    let col = eval(`cords.ballColIdx ${colOperator} 1`)
    let row = eval(`cords.ballRowIdx ${rowOperator} 1`)

    while (eval(`col ${colComparator} cords.colIdx`) &&
        eval(`row ${rowComparator} cords.rowIdx`)) {
        const hasPlayer = board[row][col].player

        console.log(`Y ${col} X: ${row}`)
        console.log(`Has Player: ${hasPlayer}`)

        if (!hasPlayer) return false

        // increment or decrement
        eval(`col${colOperator}${colOperator}`)
        eval(`row${rowOperator}${rowOperator}`)
    }

    col = eval(`cords.ballColIdx ${colOperator} 1`)
    row = eval(`cords.ballRowIdx ${rowOperator} 1`)

    while (eval(`col ${colComparator} cords.colIdx`) &&
        eval(`row ${rowComparator} cords.rowIdx`)) {
        board[row][col].player = false
        eval(`col${colOperator}${colOperator}`)
        eval(`row${rowOperator}${rowOperator}`)
    }

    board[cords.ballRowIdx][cords.ballColIdx].ball = false
    board[cords.rowIdx][cords.colIdx].ball = true

    return board
}

export const gameOver = (player, cords) => {
    if (cords.row === 0 && player.name === PLAYER_OKS) return true
    if (cords.row === (ROWS - 1) && player.name === PLEYER_EKS) return true
    return false
}
