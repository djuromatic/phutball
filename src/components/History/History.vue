<template>
  <div class="history">
    <history-move />
  </div>
</template>

<script>
import HistoryMove from "./HistoryMove";

export default {
  components: {
    HistoryMove,
  },
};
</script>

<style>
.history {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 350px;
  background-color: rgb(197, 191, 184);
}
</style>