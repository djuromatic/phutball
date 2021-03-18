<template>
  <div></div>
</template>

<script>
import { mapActions } from "vuex";
import {
  unblockBoard,
  eksTurn,
  placeBallInCentar,
  setPlayerPice,
  endTurn,
  setMoveInHistory,
  tryJump,
  playerOnTurn,
  gameOver,
} from "../util/game-actions";
import { getAlphaFromNumber } from "../store/initial-state";
export default {
  computed: {
    players() {
      return this.$store.getters.getPlayers;
    },
    extend_ballSelected() {
      return this.$store.getters.getBallSelected;
    },
    extend_gameStarted() {
      return this.$store.getters.getGameStart;
    },
  },
  watch: {
    extend_ballSelected() {
      if (this.extend_ballSelected) {
        // block player tile
      } else {
        // reset
      }
    },
  },
  methods: {
    ...mapActions({
      setNewBoard: "setNewBoard",
      setInitState: "setInitState",
      setPlayers: "setPlayers",
      setHistory: "setHistory",
      setBallSelected: "setBallSelected",
      setGameStart: "setGameStart",
    }),
    extend_setInitBoard() {
      this.setInitState();
    },
    extend_onStartGame() {
      this.setInitState();
      this.setHistory([]);
      const board = this.$store.getters.getBoard;
      const players = this.$store.getters.getPlayers;
      this.setGameStart(true);
      this.setPlayers(eksTurn(players));
      this.setNewBoard(placeBallInCentar(unblockBoard(board)));
    },

    extend_setPlayerPiece(tileId) {
      const board = this.$store.getters.getBoard;
      const players = this.$store.getters.getPlayers;
      const history = this.$store.getters.getHistory;

      const currentPlayerName = players.eks.onTurn
        ? players.eks.name
        : players.oks.name;

      this.setNewBoard(setPlayerPice(tileId, board));
      this.setPlayers(endTurn(players));
      this.setHistory(setMoveInHistory(tileId, currentPlayerName, history));
    },

    extend_selectBallToggle(value) {
      this.setBallSelected(value);
    },

    // Updated today
    // There was no message of move ball action and player was not ending his turn
    // There was no logic for game over
    extend_tryJump(selectedCords) {
      const history = this.$store.getters.getHistory;
      const board = this.$store.getters.getBoard;
      const player = playerOnTurn(this.$store.getters.getPlayers);
      const validMove = tryJump(board, selectedCords, player);
      if (!validMove) {
        this.setHistory(
          setMoveInHistory(selectedCords.id, "INVALID MOVE", history)
        );
      } else if (gameOver(player, selectedCords)) {
        this.setGameStart(false);
        this.setHistory(
          setMoveInHistory(
            getAlphaFromNumber(selectedCords.col) + (selectedCords.row + 1),
            player.name + " Has win the game",
            history
          )
        );
        this.setBallSelected(false);
      } else {
        this.setNewBoard(validMove);
        this.setHistory(
          setMoveInHistory(
            getAlphaFromNumber(selectedCords.col) + (selectedCords.row + 1),
            player.name + " Moved Ball",
            history
          )
        );
        this.setBallSelected(false);
        this.setPlayers(endTurn(this.$store.getters.getPlayers));
      }
    },
  },
};
</script>
