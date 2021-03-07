<template>
  <div>
    <h1>Phutball Game</h1>
    <table class="board">
      <thead>
        <tr>
          <th></th>
          <th v-for="(header, index) in headerLength" :key="index">
            {{ getAlphaFromNumber(index) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tiles-row
          v-for="(item, index) in getBoard"
          :key="index"
          :row="item"
          :index="index"
        />
      </tbody>
    </table>
    <hr />
    <button
      class="primary btn-primary"
      v-if="!extend_gameStarted"
      @click="extend_onStartGame"
    >
      Start Game
    </button>
    <button
      class="primary btn-secundary"
      v-if="extend_ballSelected"
      @click="extend_selectBallToggle(false)"
    >
      Leave a ball
    </button>
  </div>
</template>

<script>
import TilesRow from "../TIles/TilesRow.vue";
import GameLogic from "../../extends/GameLogic";
import { mapGetters } from "vuex";

export default {
  components: { TilesRow },
  name: "the-board",
  extends: GameLogic,
  computed: {
    ...mapGetters(["getBoard"]),
    headerLength() {
      const headers = this.getBoard;
      if (headers.length > 0) {
        return headers[0].filter((item) => item);
      } else {
        return [];
      }
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.extend_setInitBoard();
  },
  methods: {
    getAlphaFromNumber(number) {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const alphabetList = alphabet.slice("");
      return alphabetList[number];
    },
  },
};
</script>

<style>
.board {
  margin: 0 auto;
}
.board th {
  width: 25px;
  height: 25px;
}
.board td {
  width: 25px;
  height: 25px;
  border: 1px solid black;
}
</style>