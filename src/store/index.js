import Vue from 'vue'
import Vuex from 'vuex'
import { initBoard, initPlayers } from './initial-state'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        players: {},
        board: {},
        history: [],
        ballSelected: false,
        gameStarted: false
    },
    getters: {
        getBoard: state => {
            return state.board
        },

        getPlayers: state => {
            return state.players
        },

        getHistory: state => {
            return state.history
        },

        getBallSelected: state => {
            return state.ballSelected
        },

        getGameStart: state => {
            return state.gameStarted
        }

    },
    mutations: {
        setInitState(state) {
            state.board = initBoard()
            state.players = initPlayers()

        },

        setNewBoard(state, payload) {
            state.board = payload
        },

        setPlayers(state, payload) {
            state.players = payload
        },

        setHistory(state, payload) {
            state.history = payload
        },

        setBallSelected(state, payload) {
            state.ballSelected = payload
        },

        setGameStart(state, payload) {
            state.gameStarted = payload
        }
    },
    actions: {
        setInitState(context) {
            context.commit('setInitState')
        },
        setNewBoard(context, payload) {
            context.commit('setNewBoard', payload)
        },
        setPlayers(context, payload) {
            context.commit('setPlayers', payload)
        },
        setHistory(context, payload) {
            context.commit('setHistory', payload)
        },
        setBallSelected(context, payload) {
            context.commit('setBallSelected', payload)
        },
        setGameStart(context, payload) {
            context.commit('setGameStart', payload)
        }
    }
})
export default store