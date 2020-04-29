import Vue from "vue";
import Vuex from "vuex";
import * as _ from "lodash";
import { defaultProject } from "../classes/Project";
import { noStatus } from "../classes/Status";
import { Settings } from "../classes/Settings";
import { ActBreak } from "../classes/ActBreak";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  getters: {
    displayStatuses: state =>
      state.project.settings.statuses.filter(status => status.display)
  },
  modules: {},
  mutations: {
    ADD_CARD: (state, card) => state.project.cards.push(card),
    EDIT_CARD: (state, card) => {
      const index = _.findIndex(state.project.cards, ["id", card.id]);
      // ActBreak edit
      if (card.act) {
        state.project.cards[index].act = card.act;
      }
      // Scene edit
      if (card.description) {
        state.project.cards[index].edit(
          card.description,
          card.isPlot,
          card.status,
          card.title
        );
      }
    },
    MODIFY_PROJECT: (state, project) => (state.project = project),
    MODIFY_SETTINGS: (state, settings) => {
      state.project.settings = new Settings(
        _.union([noStatus], settings.statuses), // Preserve the noStatus
        settings.title
      );
      // Update the statuses on the Scene objects as well
      for (let i = 0; i < state.project.cards.length; i++) {
        if (state.project.cards[i] instanceof ActBreak) {
          continue;
        }
        const index = _.findIndex(state.project.settings.statuses, [
          "id",
          state.project.cards[i].status.id
        ]);
        /*
         * Status not found? Must have been removed, assign the noStatus.
         * Otherwise reassign the status so the scene gets any updated values.
         */
        state.project.cards[i].status =
          index === -1 ? noStatus : state.project.settings.statuses[index];
      }
    },
    MOVE_CARD: (state, card, index) => {
      Vue.set(
        state.project,
        "cards",
        _.pull(state.project.cards, card).splice(index, 0, card)
      );
    },
    REMOVE_CARD: function(state, card) {
      // TODO why is this not being updated automatically
      Vue.set(state.project, "cards", _.pull(state.project.cards, card));
    }
  },
  state: {
    project: defaultProject
  }
});
