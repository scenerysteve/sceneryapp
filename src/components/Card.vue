<template>
  <div
    class="d-flex"
    :class="{ 'act-break': isActBreak, scene: !isActBreak }"
    draggable="true"
    @dragover.prevent.stop
    @dragstart="dragStart"
    @dragend.prevent="dragEnd"
    @drop.prevent="drop"
    :id="card.id"
  >
    <act-break :card="card" class="flex-shrink-0" v-if="isActBreak" />
    <Scene :card="card" class="flex-shrink-0" v-else />
    <v-container class="flex-shrink-0">
      <v-row dense>
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn
              @click="eventDispatcher.$emit('cardRemove', card.id)"
              icon
              v-on="on"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </template>
          <span>Remove Card</span>
        </v-tooltip>
      </v-row>
      <v-row dense>
        <v-tooltip top>
          <template #activator="{ on }">
            <v-btn @click="cardEdit" icon v-on="on">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <span>Edit Card</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { ActBreak as ActBreakObj } from "../classes/ActBreak";
import ActBreak from "./ActBreak";
import Scene from "./Scene";
import Vue from "vue";
import { mapMutations } from "vuex";

export default Vue.extend({
  components: {
    ActBreak,
    Scene
  },
  computed: {
    isActBreak() {
      return this.card instanceof ActBreakObj;
    }
  },
  methods: {
    ...mapMutations(["MOVE_CARD"]),
    cardEdit() {
      this.$router.push(
        (this.isActBreak ? "/editActBreak/" : "/editScene/") + this.card.id
      );
    },
    dragStart: event => {
      // The target in the dragStart is the card being dragged
      event.dataTransfer.setData("cardId", event.target.id);
      setTimeout(() => {
        // Hide the original drag card because we'll have a copy that moves with the cursor
        event.target.style.display = "none";
      }, 0);
    },
    dragEnd(event) {
      event.target.style.display = "block";
    },
    drop(event) {
      /*
       * Need to look through the path to find the correct element in the likely event
       * that the user didn't drop the card directly onto the parent div that has the ID.
       */
      let dropCardId = event.target.id;
      if (!dropCardId) {
        for (let i = 0; i < event.path.length; i++) {
          if (
            event.path[i].className &&
            (event.path[i].className.indexOf("act-break") >= 0 ||
              event.path[i].className.indexOf("scene") >= 0) &&
            event.path[i].id
          ) {
            dropCardId = event.path[i].id;
          }
        }
      }
      // Show the original dragged card which we hid before in the dragStart handler
      document.getElementById(
        event.dataTransfer.getData("cardId")
      ).style.display = "block";
      this.MOVE_CARD({
        dragCardId: event.dataTransfer.getData("cardId"),
        dropCardId: dropCardId
      });
    }
  },
  name: "Card",
  props: ["card", "eventDispatcher"]
});
</script>
