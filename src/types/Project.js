import { Card } from "./Card";
import Status from "./Status";

interface Project {
  cards: Array<Card>;
  statuses: Array<Status>;
  title: string;
}
