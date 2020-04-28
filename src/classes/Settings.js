import { defaultStatuses } from "./Status";

export class Settings {
  constructor(statuses, title) {
    this.statuses = statuses;
    this.title = title;
  }
}

export const defaultSettings = new Settings(defaultStatuses, "New Project");
