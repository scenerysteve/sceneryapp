import { v4 as uuidv4 } from "uuid";

export default class Card {
  id;

  constructor() {
    this.id = uuidv4();
  }
}
