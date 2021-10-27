export default {
  getEstimateItem() {
    return `
    SELECT
        estimate_id,
        research_id,
        estimate_price,
        estimate_content
    FROM
        t_estimate_item
    WHERE
        estimate_id = :estimate_id;`;
  },
};
