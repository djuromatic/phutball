

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
    const ballPosition = board.map(element => {
        return element.find(item => item.ball)
    }).filter(item => item !== undefined);
    const cords = { rowIdx: selectedCords.row, colIdx: selectedCords.col, ballRowIdx: ballPosition[0].row, ballColIdx: ballPosition[0].col }
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

    if (cords.ballColIdx + 1 === cords.colIdx) return false
    if (cords.ballColIdx - 1 === cords.colIdx) return false

    for (let idx = minRowIdx + 1; idx < maxRowIdx; idx++) {
        const hasPlayer = board[cords.rowIdx][idx].player === true

        if (!hasPlayer) return false
    }

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

    if (cords.ballRowIdx + 1 === cords.rowIdx) return false
    if (cords.ballRowIdx - 1 === cords.rowIdx) return false

    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
        const hasPlayer = board[idx][cords.colIdx].player === true
        console.log("BOARD[ " + cords.rowIdx + ", " + idx)
        if (!hasPlayer) return false
    }

    for (let idx = minColIdx + 1; idx < maxColIdx; idx++) {
        board[idx][cords.colIdx].player = false
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

    if (Math.abs(cords.rowIdx - cords.ballRowIdx) === 1) return false

    let col = eval(`cords.ballColIdx ${colOperator} 1`)
    let row = eval(`cords.ballRowIdx ${rowOperator} 1`)

    while (eval(`col ${colComparator} cords.colIdx`) &&
        eval(`row ${rowComparator} cords.rowIdx`)) {

        if (board[row][col].player !== true) return false
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
export const gameOver = (board, player, cords) => {
    console.log(board, player, cords)


}
