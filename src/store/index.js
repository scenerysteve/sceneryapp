import Vue from "vue";
import Vuex from "vuex";
import * as _ from "lodash";
import "@/types/ActBreak";
import "@/types/Project";
import "@/types/Scene";
import "@/types/Status";

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {},
  getters: {
    actBreaks: state => {
      return state.project.cards.filter(card => card is ActBreak);
    },
    scenes: state => {
      return state.project.getCards().filter(card => card instanceof Scene);
    }
  },
  modules: {},
  mutations: {
    ADD_ACT_BREAK: (state, actBreak) => state.project.getCards().push(actBreak),
    ADD_SCENE: (state, scene) => state.project.getCards().push(scene),
    EDIT_ACT_BREAK: (state, data) =>
      state.project.setCards(
        state.project.getCards().splice(data.index, 1, data.newActBreak)
      ),
    EDIT_SCENE: (state, data) =>
      (state.project.getCards()[data.index] = data.newScene),
    // REMOVE_ACT_BREAK: () => (),
    REMOVE_SCENE: (state, scene) =>
      state.project.setCards(_.pull(state.project.getCards(), scene)),
    SET_STATUSES: (state, statuses) => {
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
    },
    SET_TITLE: (state, title) => state.project.setTitle(title)
  },
  state: {
    // TODO statuses should probably be a property of the project
    project: new Project(
      [
        new ActBreak(1),
        new Scene(
          "Add a scene description here",
          true,
          new Status("#ffffff", "Not Written"),
          "Add a title here"
        )
      ],
      "New Project"
    ),
    statuses: [
      new Status("#ffffff", "Not Written"),
      new Status("#dcffdc", "Completed"),
      new Status("#dcdcff", "Partially Written"),
      new Status("#ffffdc", "Needs Rewrites"),
      new Status("#ffdcdc", "Possibly Unnecessary")
    ]
  }
});
