<template>
  <v-row no-gutters>
    <v-col>
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-form>
              <v-switch
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
              <v-expansion-panels :disabled="!filters.scenes">
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
              <v-btn class="mt-6" @click.prevent="resetFilters" color="primary">
                Reset
              </v-btn>
            </v-form>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  methods: {
    resetFilters() {
      this.eventDispatcher.$emit("resetFilters");
    }
  },
  name: "ProjectFilters",
  props: ["eventDispatcher", "filters"]
});
</script>
