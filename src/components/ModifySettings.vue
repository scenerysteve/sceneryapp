<template>
  <div>
    <v-text-field autofocus v-model="settings.title"></v-text-field>
    <h2 class="font-weight-light mb-4">Statuses</h2>
    <div
      class="d-flex justify-space-between"
      :key="status.id"
      v-for="status in settings.statuses"
    >
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            @click="colorInputClick(status.id)"
            elevation="3"
            icon
            large
            :style="{ 'background-color': status.color }"
            v-on="on"
          >
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </template>
        <span>Color {{ status.color }}</span>
      </v-tooltip>
      <input
        :id="'color-input-' + status.id"
        style="visibility: hidden;"
        type="color"
        v-model="status.color"
      />
      <v-text-field label="Name" v-model="status.name"></v-text-field>
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn @click="removeStatus(status.id)" icon large v-on="on">
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </template>
        <span>Remove Status</span>
      </v-tooltip>
    </div>
    <div class="mb-4">
      <v-btn class="mr-4" @click="addStatus">
        <v-icon class="mr-1">mdi-plus-circle-outline</v-icon> Add Status
      </v-btn>
      <v-btn @click="removeAllStatuses" color="error">
        <v-icon class="mr-1">mdi-minus-circle-outline</v-icon> Remove All
      </v-btn>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  methods: {
    addStatus() {
      this.eventListener.$emit("addStatus");
    },
    colorInputClick(statusId) {
      document.getElementById("color-input-" + statusId).click();
    },
    removeAllStatuses() {
      this.eventListener.$emit("removeAllStatuses");
    },
    removeStatus(statusId) {
      this.eventListener.$emit("removeStatus", statusId);
    }
  },
  name: "ModifySettings",
  props: ["eventListener", "settings"]
});
</script>
