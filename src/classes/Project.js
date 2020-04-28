import { ActBreak } from "./ActBreak";
import { defaultScene } from "./Scene";
import { defaultSettings } from "./Settings";

export class Project {
  constructor(cards, settings) {
    this.cards = cards;
    this.settings = settings;
  }
}

export const defaultProject = new Project(
  [new ActBreak(1), defaultScene],
  defaultSettings
);
