<template>
  <tr>
    <th>{{ index + 1 }}</th>
    <tile v-for="(item, index) in row" :key="index" :tile="item" />
  </tr>
</template>

<script>
import Tile from "./Tile.vue";
export default {
  components: { Tile },
  props: {
    index: {
      type: Number,
      required: true,
    },
    row: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<style>
</style>