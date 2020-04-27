import { Card } from "./Card";
import { defaultStatuses } from "./Status";

export class Scene extends Card {
  constructor(description, isPlot, status, title) {
    super();
    this.edit(description, isPlot, status, title);
  }

  edit(description, isPlot, status, title) {
    this.description = description;
    this.isPlot = isPlot;
    this.status = status;
    this.title = title;
  }
}

export const defaultScene = new Scene(
  "Add a longer scene description here.",
  true,
  defaultStatuses[1], // Not written
  "Add a title here"
);
