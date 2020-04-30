<template>
  <v-container class="full pa-0" fluid>
    <v-row no-gutters>
      <v-col>
        <v-tabs grow primary>
          <v-tab>{{ project.settings.title }}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col>
        <v-expansion-panels focusable>
          <v-expansion-panel>
            <v-expansion-panel-header>Filters</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-form>
                <v-switch
                  class="mt-0"
                  dense
                  label="Act Breaks"
                  v-model="filters.actBreaks"
                ></v-switch>
                <v-switch
                  class="mt-0"
                  dense
                  label="Scenes"
                  v-model="filters.scenes"
                ></v-switch>
                <v-switch
                  class="mt-0"
                  dense
                  :disabled="!filters.scenes"
                  label="Plot Scenes"
                  v-model="filters.plot"
                ></v-switch>
                <v-switch
                  class="mt-0"
                  dense
                  :disabled="!filters.scenes"
                  label="Filler Scenes"
                  v-model="filters.filler"
                ></v-switch>
                <v-expansion-panels :disabled="!filters.scenes" focusable>
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
          <div class="ma-4" :key="card.id" v-for="card in filteredCards">
            <Card :card="card" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ActBreak } from "../classes/ActBreak";
import Card from "./Card.vue";
import * as _ from "lodash";
import { Scene } from "../classes/Scene";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: { Card },
  computed: {
    ...mapState(["project"]),
    filteredCards() {
      return this.project.cards.filter(this.filter);
    }
  },
  created() {
    for (let i = 0; i < this.project.settings.statuses.length; i++) {
      Vue.set(
        this.filters.statuses,
        this.project.settings.statuses[i].name,
        true
      );
    }
  },
  data() {
    return {
      filters: {
        actBreaks: true,
        filler: true,
        plot: true,
        scenes: true,
        statuses: {}
      }
    };
  },
  methods: {
    filter(card) {
      return (
        (card instanceof Scene &&
          this.filters.scenes &&
          ((this.filters.plot && card.isPlot) ||
            (this.filters.filler && !card.isPlot)) &&
          this.filters.statuses[card.status.name]) ||
        (card instanceof ActBreak && this.filters.actBreaks)
      );
    },
    resetFilters() {
      this.filters.actBreaks = true;
      this.filters.filler = true;
      this.filters.plot = true;
      this.filters.scenes = true;
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
