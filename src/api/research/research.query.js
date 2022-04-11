export default {
  getResearchListAll() {
    return `
    SELECT
        research_id,
        research_title,
        research_desc,
        created_at,
        modified_at,
        category_id
    FROM
        t_research;`;
  },
  getResearch() {
    return `
    SELECT
        research_id,
        research_title,
        research_desc,
        created_at,
        modified_at,
        category_id
    FROM
        t_research
    WHERE
        category_id = :category_id;`;
  },
};
