<template>
  <v-col class="px-0">
    <v-container>
      <v-row dense>
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn @click="eventDispatcher.$emit('removeCard')" icon v-on="on">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </template>
          <span>Remove Card</span>
        </v-tooltip>
      </v-row>
      <v-row dense>
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn @click="eventDispatcher.$emit('editCard')" icon v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit Card</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-col>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "CardControls",
  props: ["eventDispatcher"]
});
</script>
