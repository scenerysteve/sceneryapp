import { Card } from "./Card";
import * as _ from "lodash";

export class ActBreak extends Card {
  constructor(parameters) {
    super();
    this.act = _.has(parameters, "act") ? parameters.act : 1;
    this.id = _.has(parameters, "id") ? parameters.id : this.id;
  }
}
