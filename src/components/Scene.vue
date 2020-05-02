<template>
  <v-card :style="{ 'background-color': card.status.color }">
    <v-container>
      <v-row dense>
        <v-col cols="10">
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
        </v-col>
        <card-controls :event-dispatcher="eventDispatcher" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import CardControls from "./CardControls";
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  components: { CardControls },
  computed: {
    icon() {
      return this.card.isPlot ? "mdi-star" : "mdi-star-outline";
    }
  },
  created() {
    this.eventDispatcher.$on("editCard", this.editCard);
    this.eventDispatcher.$on("removeCard", this.removeCard);
  },
  data() {
    return {
      eventDispatcher: new Vue({})
    };
  },
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    editCard() {
      this.$router.push("editScene/" + this.card.id);
    },
    removeCard() {
      if (confirm("Are you sure you want to remove this card?")) {
        this.REMOVE_CARD(this.card);
      }
    }
  },
  name: "Scene",
  props: ["card"]
});
</script>
