<template>
  <div>
    <v-text-field label="Title" v-model="scene.title"></v-text-field>
    <v-textarea
      filled
      label="Description"
      v-model="scene.description"
    ></v-textarea>
    <v-switch label="Plot Scene" v-model="scene.isPlot"></v-switch>
    <v-select
      :items="project.settings.statuses"
      item-text="name"
      item-value="id"
      label="Status"
      v-model="scene.statusId"
    ></v-select>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
  computed: {
    ...mapState(["project"])
  },
  name: "ModifyScene",
  props: ["scene"]
});
</script>
