export default {
  getEstimateListAll() {
    return `
    SELECT
      estimate_id,
      customer_id,
      type_id,
      contact_nm,
      contact_tel,
      contact_date,
      contact_type,
      estimate_scale,
      estimate_status,
      estimate_request,
      created_at,
      modified_at
    FROM
        t_estimate;`;
  },
  getEstimate() {
    return `
    SELECT
      estimate_id,
      customer_id,
      type_id,
      contact_nm,
      contact_tel,
      contact_date,
      contact_type,
      estimate_scale,
      estimate_status,
      estimate_request,
      created_at,
      modified_at
    FROM
        t_estimate
    WHERE
        estimate_id = :estimate_id;`;
  },
};
