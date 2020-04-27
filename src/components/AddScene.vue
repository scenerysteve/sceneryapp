<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="addScene">
          <div>
            <h1 class="d-inline-block font-weight-light">Add Scene</h1>
            <router-link to="project">
              <v-tooltip bottom>
                <template #activator="{ on }">
                  <v-btn
                    class="float-right"
                    color="primary"
                    icon
                    large
                    v-on="on"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>Return to Project View</span>
              </v-tooltip>
            </router-link>
          </div>
          <v-text-field label="Title" v-model="title"></v-text-field>
          <v-textarea
            filled
            label="Description"
            v-model="description"
          ></v-textarea>
          <v-switch label="Plot Scene" v-model="isPlot"></v-switch>
          <v-select
            :items="statusNames"
            label="Status"
            v-model="status"
          ></v-select>
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import Scene from "@/types/Scene";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project", "statuses"]),
    statusNames: function() {
      const names = [];
      for (let i = 0; i < this.statuses.length; i++) {
        names.push(this.statuses[i].getName());
      }
      return names;
    }
  },
  created() {
    this.status = this.statusNames[0];
  },
  data() {
    return {
      description: "",
      isPlot: false,
      status: null,
      title: ""
    };
  },
  methods: {
    ...mapMutations(["ADD_SCENE"]),
    addScene: function() {
      this.ADD_SCENE(
        new Scene(
          this.description,
          this.isPlot,
          this.findStatus(this.status),
          this.title
        )
      );
      this.description = "";
      this.isPlot = false;
      this.status = this.statusNames[0];
      this.title = "";
    },
    findStatus: function(statusName) {
      return _.find(
        this.statuses,
        status => status.getName().localeCompare(statusName) === 0
      );
    }
  },
  name: "AddScene"
});
</script>
