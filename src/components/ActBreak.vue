<template>
  <v-card color="grey">
    <v-card-title>Act {{ card.getAct() }}</v-card-title>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ActBreak",
  props: ["card"]
});
</script>
