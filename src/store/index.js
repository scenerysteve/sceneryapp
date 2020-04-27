import Vue from "vue";
import Vuex from "vuex";
import * as _ from "lodash";
import { defaultProject } from "../classes/Project";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  getters: {
    actBreaks: state => state.project.getActBreaks(),
    displayStatuses: state => state.project.getDisplayStatuses(),
    scenes: state => state.project.getScenes()
  },
  modules: {},
  mutations: {
    ADD_ACT_BREAK: (state, actBreak) => state.project.cards.push(actBreak),
    ADD_SCENE: (state, scene) => state.project.cards.push(scene),
    EDIT_ACT_BREAK: () => {
      // EDIT_ACT_BREAK: (state, data) => {
      /*

      state.project.setCards(
        state.project.getCards().splice(data.index, 1, data.newActBreak)
      )
       */
    },
    EDIT_SCENE: (state, data) =>
      (state.project.cards[data.index] = data.newScene),
    // REMOVE_ACT_BREAK: () => (),
    REMOVE_SCENE: (state, scene) =>
      (state.project.cards = _.pull(state.project.cards, scene)),
    // state.project.setCards(_.pull(state.project.getCards(), scene)),
    SET_STATUSES: () => {
      // SET_STATUSES: (state, statuses) => {
      /*
      // Update statuses to keep
      for (let i = 0; i < statuses.length; i++) {
        const index = _.findIndex(state.statuses, ["id", statuses[i].id]);
        state.statuses[index].setColor(statuses[i].color);
        state.statuses[index].setName(statuses[i].name);
      }
      // Remove the statuses that were deleted
      state.statuses = _.intersectionBy(state.statuses, statuses, "id");
      // Update scene statuses
      for (let i = 0; i < state.project.getCards().length; i++) {
        if (state.project.getCards()[i] instanceof Scene) {
          const status = (state.project.getCards()[i] as Scene).getStatus();
          const statusIndex = _.findIndex(state.statuses, ["id", status]);
          if (statusIndex >= 0) {
            (state.project.getCards()[i] as Scene).setStatus(
              state.statuses[statusIndex]
            );
          }
          if (statusIndex === -1) {
            (state.project.getCards()[i] as Scene).setStatus(null);
          }
        }
      }
       */
    },
    SET_TITLE: (state, title) => (state.project.title = title)
  },
  state: {
    project: defaultProject
  }
});
