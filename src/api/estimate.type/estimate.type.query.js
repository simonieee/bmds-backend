export default {
  getEstimateType() {
    return `
    SELECT
        type_id,
        type_title,
        type_desc,
        created_at,
        modified_at
    FROM
        t_estimate_type;`;
  },
};
