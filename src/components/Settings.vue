<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form @submit.prevent="submit">
          <modify-settings
            :event-listener="eventListener"
            :settings="settings"
          />
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as _ from "lodash";
import FormHeader from "./FormHeader";
import ModifySettings from "./ModifySettings";
import { Status } from "../classes/Status";
import Vue from "vue";
import { mapGetters, mapMutations, mapState } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifySettings },
  computed: {
    ...mapGetters(["displayStatuses"]),
    ...mapState(["project"])
  },
  created() {
    // TODO Find out why these values are being saved even when the form is not submitted
    this.settings.statuses = this.displayStatuses;
    this.settings.title = this.project.settings.title;
    this.eventListener.$on("addStatus", this.addStatus);
    this.eventListener.$on("removeAllStatuses", this.removeAllStatuses);
    this.eventListener.$on("removeStatus", this.removeStatus);
  },
  data() {
    return {
      eventListener: new Vue({}),
      settings: {
        statuses: [],
        title: ""
      }
    };
  },
  methods: {
    ...mapMutations(["MODIFY_SETTINGS"]),
    addStatus() {
      this.settings.statuses.push(
        new Status({
          color: "#ffffff",
          display: true,
          name: "New Status"
        })
      );
    },
    removeAllStatuses() {
      if (confirm("Are you sure you want to remove all statuses?")) {
        this.settings.statuses = [];
      }
    },
    removeStatus(statusId) {
      if (confirm("Are you sure you want to remove this status?")) {
        Vue.set(
          this.settings,
          "statuses",
          _.pull(this.settings.statuses, statusId)
        );
        this.$forceUpdate();
      }
    },
    submit() {
      this.MODIFY_SETTINGS(this.settings);
      this.$router.push("/project");
    }
  },
  name: "Settings"
});
</script>
