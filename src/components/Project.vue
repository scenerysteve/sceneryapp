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
          <div class="ma-4" :key="card.id" v-for="card in filteredCards">
            <Card :card="card" />
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { mapState } from "vuex";
import Card from "./Card.vue";
import { ActBreak } from "../classes/ActBreak";
import { Scene } from "../classes/Scene";

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
        plot: true,
        filler: true,
        statuses: {}
      }
    };
  },
  methods: {
    filter(card) {
      return (
        (card instanceof Scene &&
          ((this.filters.plot && card.isPlot) ||
            (this.filters.filler && !card.isPlot)) &&
          this.filters.statuses[card.status.name]) ||
        card instanceof ActBreak
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
