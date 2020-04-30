<template>
  <v-container>
    <form-header />
    <v-row>
      <v-col>
        <v-form @submit.prevent="addActBreak">
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
import Vue from "vue";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  components: { FormHeader, ModifyActBreak },
  computed: {
    ...mapState(["project"])
  },
  data() {
    return {
      actBreak: {
        act: 1 // TODO make this +1 of highest current act breaks in project
      }
    };
  },
  methods: {
    ...mapMutations(["ADD_CARD"]),
    addActBreak() {
      this.ADD_CARD(new ActBreak(this.actBreak));
      this.$router.push("/project");
    }
  },
  name: "AddActBreak"
});
</script>
