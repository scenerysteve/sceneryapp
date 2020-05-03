<template>
  <v-card class="text-center" color="grey lighten-3" shaped>
    <v-container>
      <v-row dense>
        <v-col>
          <v-container>
            <v-row dense>
              <v-col>
                <span class="font-weight-normal headline">Act</span>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col>
                <span class="display-1 font-weight-bold">{{ card.act }}</span>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <card-controls :event-dispatcher="eventDispatcher" />
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import CardControls from "./CardControls";
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  components: { CardControls },
  created() {
    this.eventDispatcher.$on("editCard", this.editCard);
    this.eventDispatcher.$on("removeCard", this.removeCard);
  },
  data() {
    return {
      eventDispatcher: new Vue({})
    };
  },
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    editCard() {
      this.$router.push("/editActBreak/" + this.card.id);
    },
    removeCard() {
      // TODO implement Dialog component here
      if (confirm("Are you sure you want to remove this card?")) {
        this.REMOVE_CARD(this.card);
      }
    }
  },
  name: "ActBreak",
  props: ["card"]
});
</script>
