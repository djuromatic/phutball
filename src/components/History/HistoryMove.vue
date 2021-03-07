<template>
  <div>
    <div class="card" v-for="(item, index) in history" :key="index">
      {{ item.name + " - " + item.tileId }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    history() {
      return this.$store.getters.getHistory;
    },
  },
};
</script>

<style>
.card {
  text-align: left;
  padding-left: 10px;
}
</style>