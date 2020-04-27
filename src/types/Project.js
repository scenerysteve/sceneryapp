export default class Project {
  cards;
  statuses;
  title;

  constructor(cards, statuses, title) {
    this.cards = cards;
    this.statuses = statuses;
    this.title = title;
  }
}
