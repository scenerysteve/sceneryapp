import { ActBreak } from "./ActBreak";
import * as _ from "lodash";
import { defaultScene } from "./Scene";
import { defaultSettings } from "./Settings";

export class Project {
  constructor(parameters) {
    this.cards = _.has(parameters, "cards") ? parameters.cards : [];
    this.settings = _.has(parameters, "settings") ? parameters.settings : {};
  }
}

export const defaultProject = new Project({
  cards: [new ActBreak({ act: 1 }), defaultScene],
  settings: defaultSettings
});
