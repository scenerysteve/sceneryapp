<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form @submit.prevent="editActBreak">
          <modify-act-break :act-break="actBreak" />
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ActBreak } from "../classes/ActBreak";
import ModifyActBreak from "./ModifyActBreak";
import FormHeader from "./FormHeader";
import * as _ from "lodash";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifyActBreak },
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
