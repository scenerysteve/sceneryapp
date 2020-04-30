<template>
  <!-- TODO Break out this markup into ModifyScene component that can be shared by add and edit components -->
  <v-container>
    <v-row>
      <v-col>
        <v-form>
          <div>
            <h1 class="d-inline-block font-weight-light">
              Add Scene
            </h1>
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
            :items="project.settings.statuses"
            item-text="name"
            item-value="id"
            label="Status"
            v-model="statusId"
          ></v-select>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                class="mr-4"
                @click="addScene(false)"
                color="primary"
                v-on="on"
              >
                Submit
              </v-btn>
            </template>
            <span>Submit and return to project view</span>
          </v-tooltip>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn @click="addScene(true)" v-on="on">
                <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Submit
              </v-btn>
            </template>
            <span>Submit and add another scene</span>
          </v-tooltip>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { Scene } from "../classes/Scene";
import { noStatus } from "../classes/Status";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"])
  },
  created() {
    this.statusId = noStatus.id;
  },
  data() {
    return {
      description: "",
      isPlot: false,
      statusId: null,
      title: ""
    };
  },
  methods: {
    ...mapMutations(["ADD_CARD"]),
    addScene(stay) {
      this.ADD_CARD(
        new Scene({
          description: this.description,
          isPlot: this.isPlot,
          status: this.findStatus(this.statusId),
          title: this.title
        })
      );
      this.description = "";
      this.isPlot = false;
      this.statusId = noStatus.id;
      this.title = "";
      if (!stay) {
        this.$router.push("/project");
      }
    },
    findStatus(id) {
      return this.project.settings.statuses[
        _.findIndex(this.project.settings.statuses, ["id", id])
      ];
    }
  },
  name: "AddScene"
});
</script>
