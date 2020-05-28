<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form @submit.prevent="editStatus">
          <modify-status :status="status" />
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormHeader from "./FormHeader";
import * as _ from "lodash";
import ModifyStatus from "./ModifyStatus";
import { Status } from "../classes/Status";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifyStatus },
  computed: {
    ...mapState(["project"]),
    status() {
      if (this.id) {
        return this.project.settings.statuses[
          _.findIndex(this.project.settings.statuses, ["id", this.id])
        ];
      }
      return {
        color: "#ffffff",
        name: ""
      };
    }
  },
  methods: {
    ...mapMutations(["EDIT_STATUS"]),
    editStatus() {
      this.EDIT_STATUS(
        new Status({
          color: this.status.color,
          id: this.status.id,
          name: this.status.name
        })
      );
      this.$router.push("/project");
    }
  },
  name: "EditStatus",
  props: ["id"]
});
</script>
