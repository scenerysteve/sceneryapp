<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form @submit.prevent="editScene">
          <!-- TODO fix up markup with containers and whatnot -->
          <modify-scene :scene="scene" />
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as _ from "lodash";
import FormHeader from "./FormHeader";
import ModifyScene from "./ModifyScene";
import { Scene } from "../classes/Scene";
import { noStatus } from "../classes/Status";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifyScene },
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
    // TODO this and EditActBreak need to just use the computed prop card. Instead of returning null if no ID, it can return the defaults
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
