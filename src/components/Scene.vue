<template>
  <v-card
    class="index-card"
    @dblclick="editScene"
    :style="{ 'background-color': scene.status.color }"
  >
    <v-card-title>
      <span>{{ scene.title }}</span>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-icon :class="{ 'is-plot': isPlot }" v-on="on">
            {{ icon }}
          </v-icon>
        </template>
        <span>{{ isPlot ? "Plot Scene" : "Filler Scene" }}</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>{{ scene.description }}</v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  computed: {
    icon() {
      return this.isPlot ? "mdi-star" : "mdi-star-outline";
    },
    isPlot() {
      return this.scene.isPlot;
    }
  },
  methods: {
    ...mapMutations(["REMOVE_SCENE"]),
    editScene() {
      this.$router.push("addScene");
    },
    removeScene() {
      this.REMOVE_SCENE(this.scene);
    }
  },
  name: "Scene",
  props: ["scene"]
});
</script>
