<template>
  <v-container class="full pa-0" fluid>
    <v-row no-gutters>
      <v-col>
        <v-tabs grow primary>
          <v-tab>{{ project.settings.title }}</v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <project-filters :event-dispatcher="eventDispatcher" :filters="filters" />
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
import ProjectFilters from "./ProjectFilters";
import { Scene } from "../classes/Scene";
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  components: { Card, ProjectFilters },
  computed: {
    ...mapState(["project"]),
    filteredCards() {
      return this.project.cards.filter(this.filter);
    }
  },
  created() {
    this.eventDispatcher.$on("resetFilters", this.resetFilters);
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
      eventDispatcher: new Vue({}),
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
