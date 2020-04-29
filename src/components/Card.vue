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
import { Scene as SceneObj } from "../classes/Scene";

export default Vue.extend({
  components: {
    ActBreak,
    Scene
  },
  computed: {
    isActBreak() {
      return this.card instanceof ActBreakObj;
    },
    isScene() {
      return this.card instanceof SceneObj;
    }
  },
  name: "Card",
  props: ["card"]
});
</script>
