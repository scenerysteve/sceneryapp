<template>
  <div>
    <v-input
      append-icon="mdi-trash-can-outline"
      @click:prepend="clickColorInput"
      :color="color"
      dense
      :messages="color"
      prepend-icon="mdi-format-color-fill"
    >
      <v-text-field label="Name" :value="status.getName()"></v-text-field>
    </v-input>
    <input
      ref="colorInput"
      style="visibility: hidden;"
      type="color"
      v-model="color"
    />
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      color: this.status.getColor()
    };
  },
  methods: {
    clickColorInput() {
      this.$refs.colorInput.click();
    }
  },
  name: "StatusInput",
  props: ["status"]
});
</script>
