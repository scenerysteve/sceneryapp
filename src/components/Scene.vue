<template>
  <v-card
    class="index-card"
    :style="{ 'background-color': scene.status.color }"
  >
    <v-container>
      <v-row>
        <v-col class="px-0">
          <v-card-title>
            <span>{{ scene.title }}</span>
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-icon :class="{ 'is-plot': scene.isPlot }" v-on="on">
                  {{ icon }}
                </v-icon>
              </template>
              <span>{{ scene.isPlot ? "Plot Scene" : "Filler Scene" }}</span>
            </v-tooltip>
          </v-card-title>
          <v-card-text>{{ scene.description }}</v-card-text>
        </v-col>
        <v-divider vertical></v-divider>
        <!-- TODO figure out best way to get the spacing here -->
        <v-col class="pl-5 pr-0" style="max-width: 50px;">
          <v-row>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn @click="removeCard" icon v-on="on">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <span>Remove Card</span>
            </v-tooltip>
          </v-row>
          <v-row>
            <v-tooltip top>
              <template #activator="{ on }">
                <v-btn @click="editScene" icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>
              <span>Edit Card</span>
            </v-tooltip>
          </v-row>
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
      return this.scene.isPlot ? "mdi-star" : "mdi-star-outline";
    }
  },
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    editScene() {
      this.$router.push("editScene/" + this.scene.id);
    },
    removeCard() {
      if (confirm("Are you sure you want to remove this card?")) {
        this.REMOVE_CARD(this.scene);
      }
    }
  },
  name: "Scene",
  props: ["scene"]
});
</script>
