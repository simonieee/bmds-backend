export default {
  getCategoryList() {
    return `
    SELECT
        category_id,
        category_nm,
        category_desc,
        created_at,
        modified_at
    FROM
        t_research_category;`;
  },
};
