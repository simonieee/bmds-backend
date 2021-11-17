export default {
  getBMAll() {
    return `
    SELECT
        tbm.bm_id,
        tbm.customer_id,
        tbm.bm_type,
        tbm.bm_title,
        tbm.bm_desc,
        tbm.created_at,
        tbm.modified_at,
        tc.customer_nm
    FROM
        t_business_model tbm
        INNER JOIN t_customer tc ON tc.customer_id = tbm.customer_id;`;
  },
  getBMByCustomer() {
    return `
    SELECT
      tbm.bm_id,
      tbm.customer_id,
      tbm.bm_type,
      tbm.bm_title,
      tbm.bm_desc,
      tbm.created_at,
      tbm.modified_at,
      tc.customer_nm
    FROM
      t_business_model tbm
      INNER JOIN t_customer tc ON tc.customer_id = tbm.customer_id
    WHERE
      tbm.customer_id = :customer_id;`;
  },
};
