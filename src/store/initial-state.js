import { PLAYER_OKS, PLEYER_EKS, COLUMNS, ROWS } from '../util/game-constants'
const defaultTileState = {
    disabled: true,
    selected: false,
    player: false,
    ball: false,
}

export const getAlphaFromNumber = (number) => {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const alphabetList = alphabet.slice("");
    return alphabetList[number];
}

export const initPlayers = () => {
    return {
        eks: {
            name: PLEYER_EKS,
            onTurn: false
        },
        oks: {
            name: PLAYER_OKS,
            onTurn: false
        }
    }
}


export const initBoard = () => {
    let tiles = [];
    for (let i = 0; i < ROWS; i++) {
        tiles[i] = [];
        for (let j = 0; j < COLUMNS; j++) {
            tiles[i].push({
                id: `${getAlphaFromNumber(j)}${i + 1}`,
                row: i,
                col: j,
                goal: i === 0 || i === ROWS - 1 ? true : null,
                ...defaultTileState,
            });
        }
    }
    return tiles;
}
