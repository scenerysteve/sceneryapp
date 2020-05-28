<template>
  <div>
    <v-text-field label="Name" v-model="status.name"></v-text-field>
    <div class="d-flex">
      <v-tooltip top>
        <template #activator="{ on }">
          <v-btn
            class="mr-4"
            @click="colorInputClick"
            elevation="3"
            icon
            large
            :style="{ 'background-color': status.color }"
            v-on="on"
          >
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </template>
        <span>Open Color Picker</span>
      </v-tooltip>
      <v-text-field label="Card HEX Color" v-model="status.color"></v-text-field>
      <input
        class="d-none"
        :id="'modify-color-input'"
        type="color"
        v-model="status.color"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  methods: {
    colorInputClick() {
      document.getElementById('modify-color-input').click();
    }
  },
  name: "ModifyStatus",
  props: ["status"]
});
</script>
