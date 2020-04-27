import Card from "./Card";

export default class Scene extends Card {
  constructor(description, isPlot, status, title) {
    super();
    this.description = description;
    this.isPlot = isPlot;
    this.status = status;
    this.title = title;
  }
}
