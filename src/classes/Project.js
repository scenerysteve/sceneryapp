import { ActBreak } from "./ActBreak";
import { defaultScene, Scene } from "./Scene";
import { defaultStatuses } from "./Status";

export class Project {
  constructor(cards, statuses, title) {
    this.edit(cards, statuses, title);
  }

  edit(cards, statuses, title) {
    this.cards = cards;
    this.statuses = statuses;
    this.title = title;
  }

  getActBreaks() {
    return this.cards.filter(card => card instanceof ActBreak);
  }

  getDisplayStatuses() {
    return this.statuses.filter(status => status.display);
  }

  getScenes() {
    return this.cards.filter(card => card instanceof Scene);
  }
}

export const defaultProject = new Project(
  [new ActBreak(1), defaultScene],
  defaultStatuses,
  "New Project"
);
