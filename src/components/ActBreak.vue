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
        <v-col class="px-0">
          <v-container>
            <v-row dense>
              <v-tooltip top>
                <template #activator="{ on }">
                  <v-btn @click="removeCard" icon v-on="on">
                    <v-icon>mdi-trash-can</v-icon>
                  </v-btn>
                </template>
                <span>Remove Card</span>
              </v-tooltip>
            </v-row>
            <v-row dense>
              <v-tooltip top>
                <template #activator="{ on }">
                  <v-btn @click="editCard" icon v-on="on">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Card</span>
              </v-tooltip>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  methods: {
    ...mapMutations(["REMOVE_CARD"]),
    editCard() {
      this.$router.push("/editActBreak/" + this.card.id);
    },
    removeCard() {
      if (confirm("Are you sure you want to remove this card?")) {
        this.REMOVE_CARD(this.card);
      }
    }
  },
  name: "ActBreak",
  props: ["card"]
});
</script>
