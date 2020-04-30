<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form>
          <modify-scene :scene="scene" />
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
    ...mapState(["project"])
  },
  created() {
    this.scene.statusId = noStatus.id;
  },
  data() {
    return {
      scene: {
        description: "",
        isPlot: false,
        statusId: null,
        title: ""
      }
    };
  },
  methods: {
    ...mapMutations(["ADD_CARD"]),
    addScene(stay) {
      this.ADD_CARD(
        new Scene({
          description: this.scene.description,
          isPlot: this.scene.isPlot,
          status: this.findStatus(this.scene.statusId),
          title: this.scene.title
        })
      );
      this.scene.description = "";
      this.scene.isPlot = false;
      this.scene.statusId = noStatus.id;
      this.scene.title = "";
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
