import * as _ from "lodash";
import { v4 as uuidv4 } from "uuid";

export class Status {
  constructor(parameters) {
    this.color = _.has(parameters, "color") ? parameters.color : "#ffffff";
    this.display = _.has(parameters, "display") ? parameters.display : true;
    this.id = _.has(parameters, "id") ? parameters.id : uuidv4();
    this.name = _.has(parameters, "name") ? parameters.name : "New Status";
  }
}

export const noStatus = new Status({
  color: "#ffffff",
  display: false,
  name: "No Status"
});

export const defaultStatuses = [
  noStatus,
  new Status({
    color: "#ffffff",
    display: true,
    name: "Not Written"
  }),
  new Status({
    color: "#dcffdc",
    display: true,
    name: "Completed"
  }),
  new Status({
    color: "#dcdcff",
    display: true,
    name: "Partially Written"
  }),
  new Status({
    color: "#ffffdc",
    display: true,
    name: "Needs Rewrites"
  }),
  new Status({
    color: "#ffdcdc",
    display: true,
    name: "Possibly Unnecessary"
  })
];
