<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="editActBreak">
          <div>
            <h1 class="d-inline-block font-weight-light">Edit Act Break</h1>
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
          <v-text-field
            label="Act"
            min="1"
            type="number"
            v-model="actBreak.act"
          ></v-text-field>
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import * as _ from "lodash";
import { ActBreak } from "../classes/ActBreak";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"])
  },
  created() {
    const index = _.findIndex(this.project.cards, ["id", this.id]);
    if (index >= 0) {
      this.actBreak.act = this.project.cards[index].act;
      this.actBreak.id = this.project.cards[index].id;
    }
  },
  data() {
    return {
      actBreak: {
        act: 0,
        id: ""
      }
    };
  },
  methods: {
    ...mapMutations(["EDIT_CARD"]),
    editActBreak() {
      this.EDIT_CARD(
        new ActBreak({
          act: this.actBreak.act,
          id: this.actBreak.id
        })
      );
      this.$router.push("/project");
    }
  },
  name: "EditActBreak",
  props: ["id"]
});
</script>
