<template>
  <v-text-field
    label="Act"
    min="1"
    type="number"
    v-model="actBreak.act"
  ></v-text-field>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "ModifyActBreak",
  props: ["actBreak"]
});
</script>
