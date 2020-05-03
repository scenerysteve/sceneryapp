<template>
  <v-dialog max-width="350" v-model="display">
    <v-card>
      <v-card-title>
        <span class="headline">
          <slot name="title" />
        </span>
      </v-card-title>
      <v-card-text>
        <slot name="text" />
      </v-card-text>
      <v-card-actions v-if="actions">
        <v-spacer></v-spacer>
        <v-btn @click="dialogOtherClick" text v-if="actions.other">
          {{ actions.other }}
        </v-btn>
        <v-btn @click="dialogConfirmClick" text v-if="actions.confirm">
          {{ actions.confirm }}
        </v-btn>
        <v-btn @click="dialogCancelClick" text v-if="actions.cancel">
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
    this.eventDispatcher.$on("showDialog", () => (this.display = true));
    this.eventDispatcher.$on("hideDialog", () => (this.display = false));
  },
  data() {
    return {
      display: false
    };
  },
  methods: {
    dialogCancelClick() {
      this.eventDispatcher.$emit("dialogCancelClick");
      this.display = false;
    },
    dialogConfirmClick() {
      this.eventDispatcher.$emit("dialogConfirmClick");
      this.display = false;
    },
    dialogOtherClick() {
      this.eventDispatcher.$emit("dialogOtherClick");
      this.display = false;
    }
  },
  name: "Dialog",
  props: ["actions", "eventDispatcher"]
});
</script>
