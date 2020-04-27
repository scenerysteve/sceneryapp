<template>
  <v-menu transition="slide-x-transition">
    <template #activator="{ on }">
      <v-card
        class="index-card"
        :style="{ 'background-color': scene.status.color }"
        v-on="on"
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
    <v-list>
      <v-list-item>
        <v-list-item-title @click="editScene">
          Edit this scene
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title @click="removeScene">
          Remove this scene
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  computed: {
    icon: function() {
      return this.isPlot ? "mdi-star" : "mdi-star-outline";
    },
    isPlot: function() {
      return this.scene.isPlot;
    }
  },
  methods: {
    ...mapMutations(["EDIT_SCENE", "REMOVE_SCENE"]),
    editScene: function() {
      this.EDIT_SCENE({
        index: this.$vnode.key,
        newScene: this.scene
      });
    },
    removeScene: function() {
      this.REMOVE_SCENE(this.scene);
    }
  },
  name: "Scene",
  props: ["scene"]
});
</script>
