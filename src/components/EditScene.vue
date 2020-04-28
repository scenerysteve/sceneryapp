<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="editScene">
          <div>
            <h1 class="d-inline-block font-weight-light">
              Edit Scene
            </h1>
            <router-link to="/project">
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
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"]),
    scene() {
      if (this.id) {
        return this.project.cards[
          _.findIndex(this.project.cards, ["id", this.id])
        ];
      }
      return null;
    }
  },
  created() {
    this.statusId = this.project.settings.statuses[0].id;
    if (this.scene) {
      this.description = this.scene.description;
      this.isPlot = this.scene.isPlot;
      this.statusId = this.scene.status.id;
      this.title = this.scene.title;
    }
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
    ...mapMutations(["EDIT_CARD"]),
    editScene() {
      this.EDIT_CARD({
        description: this.description,
        id: this.id,
        isPlot: this.isPlot,
        status: this.findStatus(this.statusId),
        title: this.title
      });
      this.description = "";
      this.isPlot = false;
      this.statusId = this.project.settings.statuses[0].id;
      this.title = "";
      this.$router.push("/project");
    },
    findStatus(id) {
      return this.project.settings.statuses[
        _.findIndex(this.project.settings.statuses, ["id", id])
      ];
    }
  },
  name: "EditScene",
  props: ["id"]
});
</script>
