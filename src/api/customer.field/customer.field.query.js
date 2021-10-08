export default {
  getCustomerField() {
    return `
    SELECT
        tcf.field_id,
        tf.field_nm
    FROM
        t_customer_field tcf
        INNER JOIN t_field tf ON tcf.field_id = tf.field_id
    WHERE
        tcf.customer_id = :customer_id`;
  },
};
