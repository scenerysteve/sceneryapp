<template>
  <div>
    <act-break :card="card" v-if="isActBreak" />
    <Scene :card="card" v-else />
  </div>
</template>

<script>
import Vue from "vue";
import ActBreak from "./ActBreak";
import Scene from "./Scene";
import { ActBreak as ActBreakObj } from "../classes/ActBreak";

export default Vue.extend({
  components: {
    ActBreak,
    Scene
  },
  computed: {
    isActBreak() {
      return this.card instanceof ActBreakObj;
    }
  },
  name: "Card",
  props: ["card"]
});
</script>
