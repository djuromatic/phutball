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
} from "../util/game-actions";
export default {
  data() {
    return {
      extend_gameStarted: false,
    };
  },
  computed: {
    players() {
      return this.$store.getters.getPlayers;
    },
    extend_ballSelected() {
      return this.$store.getters.getBallSelected;
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
    }),
    extend_setInitBoard() {
      this.setInitState();
    },
    extend_onStartGame() {
      const board = this.$store.getters.getBoard;
      const players = this.$store.getters.getPlayers;
      this.setPlayers(eksTurn(players));
      this.setNewBoard(placeBallInCentar(unblockBoard(board)));
      this.extend_gameStarted = true;
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

    extend_tryJump(selectedCords) {
      const history = this.$store.getters.getHistory;
      const board = this.$store.getters.getBoard;
      const player = playerOnTurn(this.$store.getters.getPlayers);
      const validMove = tryJump(board, selectedCords, player);
      if (!validMove) {
        this.setHistory(
          setMoveInHistory(selectedCords.id, "INVALID MOVE", history)
        );
      } else {
        this.setNewBoard(validMove);
      }
    },
  },
};
</script>
