import Vue from "vue";
import Vuex from "vuex";
import * as _ from "lodash";
import { defaultProject } from "../classes/Project";
import { noStatus, Status } from "../classes/Status";
import { Settings } from "../classes/Settings";

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
      const statusObjects = [];
      for (let i = 0; i < settings.statuses.length; i++) {
        statusObjects.push(
          new Status(
            settings.statuses[i].color,
            true,
            settings.statuses[i].name
          )
        );
        // Preserve the status ID
        statusObjects[statusObjects.length - 1].id = settings.statuses[i].id;
      }
      state.project.settings = new Settings(
        _.union([noStatus], statusObjects), // Preserve the noStatus
        settings.title
      );
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
