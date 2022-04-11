export default {
  getEstimateItem() {
    return `
    SELECT
        tei.estimate_id,
        tei.estimate_price,
        tei.estimate_content,
        tei.research_id,
        tr.research_title,
        tr.research_desc
    FROM
        t_estimate_item tei
        INNER JOIN t_research tr ON tei.research_id = tr.research_id
    WHERE
        estimate_id = :estimate_id;`;
  },
};
