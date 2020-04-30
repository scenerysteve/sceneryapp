import { Card } from "./Card";
import * as _ from "lodash";
import { defaultStatuses, noStatus } from "./Status";

export class Scene extends Card {
  constructor(parameters) {
    super();
    this.description = _.has(parameters, "description")
      ? parameters.description
      : "";
    this.id = _.has(parameters, "id") ? parameters.id : this.id;
    this.isPlot = _.has(parameters, "isPlot") ? parameters.isPlot : false;
    this.status = _.has(parameters, "status") ? parameters.status : noStatus;
    this.title = _.has(parameters, "title") ? parameters.title : "";
  }
}

export const defaultScene = new Scene({
  description: "Add a longer scene description here.",
  isPlot: true,
  status: defaultStatuses[1], // Not written
  title: "Add a title here"
});
