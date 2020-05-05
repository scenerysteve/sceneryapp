<template>
  <v-card
    style="height: 195px; width: 325px;"
    :style="{ 'background-color': card.status.color }"
  >
    <v-card-title>
      <span>{{ card.title }}</span>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-icon :class="{ 'is-plot': card.isPlot }" v-on="on">
            {{ icon }}
          </v-icon>
        </template>
        <span>{{ card.isPlot ? "Plot Scene" : "Filler Scene" }}</span>
      </v-tooltip>
    </v-card-title>
    <v-card-text>{{ card.description }}</v-card-text>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  computed: {
    icon() {
      return this.card.isPlot ? "mdi-star" : "mdi-star-outline";
    }
  },
  name: "Scene",
  props: ["card"]
});
</script>
