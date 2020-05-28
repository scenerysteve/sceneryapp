<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form>
          <modify-status :status="status" />
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                class="mr-4"
                @click="addStatus(false)"
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
              <v-btn @click="addStatus(true)" v-on="on">
                <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Submit
              </v-btn>
            </template>
            <span>Submit and add another status</span>
          </v-tooltip>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormHeader from "./FormHeader";
import ModifyStatus from "./ModifyStatus";
import { Status } from "../classes/Status";
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifyStatus },
  data() {
    return {
      status: {
        color: "#ffffff",
        name: "New Status"
      }
    };
  },
  methods: {
    ...mapMutations(["ADD_STATUS"]),
    addStatus(stay) {
      // TODO Should duplicate status names be allowed? Need to check how Project status filters work
      this.ADD_STATUS(
        new Status({
          color: this.status.color,
          name: this.status.name
        })
      );
      this.status.color = "#ffffff";
      this.status.name = "New Status";
      if (!stay) {
        this.$router.push("/project");
      }
    }
  },
  name: "AddStatus"
});
</script>
