import { PLAYER_OKS, PLEYER_EKS } from '../util/game-constants'
const columns = 15
const rows = 20
const defaultTileState = {
    disabled: true,
    selected: false,
    player: false,
    ball: false,
}

const getAlphaFromNumber = (number) => {
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
initPlayers

export const initBoard = () => {
    let tiles = [];
    for (let i = 0; i < rows; i++) {
        tiles[i] = [];
        for (let j = 0; j < columns; j++) {
            tiles[i].push({
                id: `${getAlphaFromNumber(j)}${i + 1}`,
                row: i,
                col: j,
                goal: i === 0 || i === rows - 1 ? true : null,
                ...defaultTileState,
            });
        }
    }
    return tiles;
}
