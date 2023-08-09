module.exports = class SearchParam {
  constructor() {
    this.filters = [];
    this.params = [];
    if (food_code) {
      filters.push('n.food_cd = ?');
      params.push(food_code);
    }

    if (research_year) {
      filters.push('n.research_year = ?');
      params.push(research_year);
    }
    if (food_name) {
      filters.push(`n.food_name like concat('%', ?, '%')`);
      params.push(food_name);
    }

    if (maker_name) {
      filters.push(`m.name like concat('%', ?, '%')`);
      params.push(maker_name);
    }
  }

  addParam(col, val, alias, isLike) {
    this.filters.push(
      `${alias}.${col} ${isLike ? "like concat('%', ?, '%')" : ' = ?'}`
    );
    this.params.push(val);
  }
};
