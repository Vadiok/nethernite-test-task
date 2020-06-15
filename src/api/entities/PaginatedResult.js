export class PaginatedResult {
  items;

  page;

  perPage;

  total;

  /**
   * @param {any[]} items
   * @param {number} page
   * @param {number} perPage
   * @param {number|null} total
   */
  constructor(items = [], page = 1, perPage = 10, total = null) {
    this.items = [...items];
    this.page = page;
    this.perPage = perPage;
    this.total = total;
  }
}
