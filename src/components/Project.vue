<template>
  <v-container class="full pa-0" fluid>
    <v-row no-gutters>
      <v-col>
        <v-tabs grow primary>
          <v-tab>{{ project.getTitle() }}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Filters</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form>
                <v-checkbox
                  class="mt-0"
                  dense
                  label="Plot Scenes"
                  v-model="filters.plot"
                ></v-checkbox>
                <v-checkbox
                  class="mt-0"
                  dense
                  label="Filler Scenes"
                  v-model="filters.filler"
                ></v-checkbox>
                <v-expansion-panels>
                  <v-expansion-panel>
                    <v-expansion-panel-header>
                      Statuses
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <v-switch
                        class="mt-0"
                        dense
                        :key="index"
                        :label="index"
                        v-for="(status, index) in filters.statuses"
                        v-model="filters.statuses[index]"
                      ></v-switch>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
                <v-btn
                  class="mt-6"
                  @click.prevent="resetFilters"
                  color="primary"
                >
                  Reset
                </v-btn>
              </v-form>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
    <v-row class="full" no-gutters>
      <v-col class="full">
        <div class="full project">
          <!-- TODO figure out how to display act breaks -->
          <div
            class="ma-4"
            :key="index"
            v-for="(scene, index) in filteredScenes"
          >
            <Scene :scene="scene" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { mapGetters, mapState } from "vuex";
import Scene from "./Scene.vue";

export default Vue.extend({
  components: { Scene },
  computed: {
    ...mapGetters(["actBreaks", "statusNames", "scenes"]),
    ...mapState(["project"]),
    filteredScenes() {
      return this.scenes.filter(this.filter);
    }
  },
  created() {
    for (let i = 0; i < this.statusNames.length; i++) {
      Vue.set(this.filters.statuses, this.statusNames[i], true);
    }
  },
  data() {
    return {
      filters: {
        plot: true,
        filler: true,
        statuses: {}
      }
    };
  },
  methods: {
    filter(scene) {
      return (
        ((this.filters.plot && scene.getIsPlot()) ||
          (this.filters.filler && !scene.getIsPlot())) &&
        this.filters.statuses[scene.getStatus().getName()]
      );
    },
    resetFilters() {
      this.filters.plot = true;
      this.filters.filler = true;
      Vue.set(
        this.filters,
        "statuses",
        _.mapValues(this.filters.statuses, () => {
          return true;
        })
      );
    }
  },
  name: "Project"
});
</script>
