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
          <v-text-field label="Title" v-model="scene.title"></v-text-field>
          <v-textarea
            filled
            label="Description"
            v-model="scene.description"
          ></v-textarea>
          <v-switch label="Plot Scene" v-model="scene.isPlot"></v-switch>
          <v-select
            :items="project.settings.statuses"
            item-text="name"
            item-value="id"
            label="Status"
            v-model="scene.statusId"
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
import { Scene } from "../classes/Scene";
import { noStatus } from "../classes/Status";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"]),
    card() {
      if (this.id) {
        return this.project.cards[
          _.findIndex(this.project.cards, ["id", this.id])
        ];
      }
      return null;
    }
  },
  created() {
    if (this.card) {
      this.scene.description = this.card.description;
      this.scene.id = this.card.id;
      this.scene.isPlot = this.card.isPlot;
      this.scene.statusId = this.card.status.id;
      this.scene.title = this.card.title;
    }
  },
  data() {
    return {
      scene: {
        description: "",
        id: "",
        isPlot: false,
        statusId: noStatus.id,
        title: ""
      }
    };
  },
  methods: {
    ...mapMutations(["EDIT_CARD"]),
    editScene() {
      this.EDIT_CARD(
        new Scene({
          description: this.scene.description,
          id: this.scene.id,
          isPlot: this.scene.isPlot,
          status: this.findStatus(this.scene.statusId),
          title: this.scene.title
        })
      );
      this.description = "";
      this.isPlot = false;
      this.statusId = noStatus.id;
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
