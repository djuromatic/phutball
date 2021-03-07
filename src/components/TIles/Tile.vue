<template>
  <td
    v-if="goal"
    :class="tile.row === 0 ? 'blue' : 'red'"
    @click="onGoalClick"
  ></td>
  <td v-else :disabled="disabled" @click="onTileClick">
    <ball v-if="ball" /><player v-if="player" />
  </td>
</template>

<script>
import Ball from "../Ball/Ball.vue";
import Player from "../Player/Player";
import GameLogic from "../../extends/GameLogic";
export default {
  components: { Ball, Player },
  extends: GameLogic,
  computed: {
    ball() {
      return this.tile ? this.tile.ball : null;
    },
    disabled() {
      return this.tile ? this.tile.disabled : false;
    },
    player() {
      return this.tile ? this.tile.player : false;
    },
    goal() {
      return this.tile ? this.tile.goal : false;
    },
  },
  props: {
    tile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onTileClick() {
      if (!this.extend_ballSelected && !this.ball && !this.player) {
        console.log(this.tile.id);
        this.extend_setPlayerPiece(this.tile.id);
      }
      if (this.ball && !this.player && !this.extend_ballSelected) {
        this.extend_selectBallToggle(true);
      }
      if (this.extend_ballSelected && !this.ball && !this.player) {
        this.extend_tryJump({
          row: this.tile.row,
          col: this.tile.col,
          id: this.tile.id,
        });
      }
    },
    onGoalClick() {
      this.extend_tryJump({
        row: this.tile.row,
        col: this.tile.col,
        id: this.tile.id,
      });
    },
  },
};
</script>

<style>
.blue {
  background-color: blue;
}
.red {
  background-color: red;
}
</style>