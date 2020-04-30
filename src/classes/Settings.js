import * as _ from "lodash";
import { defaultStatuses } from "./Status";

export class Settings {
  constructor(parameters) {
    this.statuses = _.has(parameters, "statuses") ? parameters.statuses : [];
    this.title = _.has(parameters, "title") ? parameters.title : "";
  }
}

export const defaultSettings = new Settings({
  statuses: defaultStatuses,
  title: "New Project"
});
