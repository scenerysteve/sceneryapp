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
import FormHeader from "./FormHeader";
import * as _ from "lodash";
import ModifySettings from "./ModifySettings";
import { defaultStatuses, noStatus } from "../classes/Status";
import Vue from "vue";

export default Vue.extend({
  components: { FormHeader, ModifySettings },
  data() {
    return {
      eventListener: new Vue({}),
      settings: {
        statuses: _.pullAllBy(defaultStatuses, [noStatus], "display"),
        title: "New Project"
      }
    };
  },
  methods: {
    submit() {
      //  TODO whatever
    }
  },
  name: "NewProject"
});
</script>
