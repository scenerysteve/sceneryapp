<template>
  <v-container>
    <v-row>
      <v-col>
        <v-form @submit.prevent="addActBreak">
          <div>
            <h1 class="d-inline-block font-weight-light">Add Act Break</h1>
            <router-link to="project">
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
            v-model="act"
          ></v-text-field>
          <v-btn color="primary" type="submit">Submit</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import ActBreak from "@/classes/ActBreak";
import { mapMutations, mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"])
  },
  data() {
    return {
      act: 1 // TODO make this +1 of highest current act breaks in project
    };
  },
  methods: {
    ...mapMutations(["ADD_ACT_BREAK"]),
    addActBreak() {
      this.ADD_ACT_BREAK(new ActBreak(this.act));
    }
  },
  name: "AddActBreak"
});
</script>
