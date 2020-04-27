import { v4 as uuidv4 } from "uuid";

export default class Status {
  color;
  display;
  id;
  name;

  constructor(color, display, name) {
    this.color = color;
    this.display = display;
    this.id = uuidv4();
    this.name = name;
  }
}
