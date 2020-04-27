import { v4 as uuidv4 } from "uuid";

export class Status {
  constructor(color, display, name) {
    this.id = uuidv4();
    this.edit(color, display, name);
  }

  edit(color, display, name) {
    this.color = color;
    this.display = display;
    this.name = name;
  }
}

export const noStatus = new Status("#ffffff", false, "No Status");

export const defaultStatuses = [
  noStatus,
  new Status("#ffffff", true, "Not Written"),
  new Status("#dcffdc", true, "Completed"),
  new Status("#dcdcff", true, "Partially Written"),
  new Status("#ffffdc", true, "Needs Rewrites"),
  new Status("#ffdcdc", true, "Possibly Unnecessary")
];
