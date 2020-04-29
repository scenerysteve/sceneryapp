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
        <v-col class="px-0" cols="2">
          <v-container>
            <v-row dense>
              <v-tooltip top>
                <template #activator="{ on }">
                  <v-btn @click="removeCard" icon v-on="on">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </template>
                <span>Remove Card</span>
              </v-tooltip>
            </v-row>
            <v-row dense>
              <v-tooltip top>
                <template #activator="{ on }">
                  <v-btn @click="editScene" icon v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Card</span>
              </v-tooltip>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  computed: {
    icon() {
      return this.card.isPlot ? "mdi-star" : "mdi-star-outline";
    }
  },
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    editScene() {
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
