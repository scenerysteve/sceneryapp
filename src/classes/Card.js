import { v4 as uuidv4 } from "uuid";

export class Card {
  constructor() {
    this.id = uuidv4();
  }
}
