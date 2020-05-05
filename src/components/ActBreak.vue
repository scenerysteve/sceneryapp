<template>
  <!-- TODO figure out better way to make this always square besides manually setting width -->
  <v-card
    class="text-center"
    color="grey lighten-3"
    shaped
    style="width: 144px;"
  >
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
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ActBreak",
  props: ["card"]
});
</script>
