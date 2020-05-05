<template>
  <v-dialog max-width="350" v-model="display">
    <v-card>
      <v-card-title>
        <span class="headline">
          <slot name="title">Warning</slot>
        </span>
      </v-card-title>
      <v-card-text>
        <slot name="text" />
      </v-card-text>
      <v-card-actions v-if="actions">
        <v-spacer></v-spacer>
        <v-btn @click="dialogOther" text v-if="actions.other">
          {{ actions.other }}
        </v-btn>
        <v-btn @click="dialogConfirm" text v-if="actions.confirm">
          {{ actions.confirm }}
        </v-btn>
        <v-btn @click="dialogCancel" text v-if="actions.cancel">
          {{ actions.cancel }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  created() {
    this.eventDispatcher.$on("dialogShow", () => (this.display = true));
    this.eventDispatcher.$on("dialogHide", () => (this.display = false));
  },
  data() {
    return {
      display: false
    };
  },
  methods: {
    dialogCancel() {
      this.eventDispatcher.$emit("dialogCancel");
      this.display = false;
    },
    dialogConfirm() {
      this.eventDispatcher.$emit("dialogConfirm");
      this.display = false;
    },
    dialogOther() {
      this.eventDispatcher.$emit("dialogOther");
      this.display = false;
    }
  },
  name: "Dialog",
  props: ["actions", "eventDispatcher"]
});
</script>
