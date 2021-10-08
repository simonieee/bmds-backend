export default {
  getExpertField() {
    return `
    SELECT
        tef.field_id,
        tf.field_nm
    FROM
        t_expert_field tef
        INNER JOIN t_field tf ON tef.field_id = tf.field_id
    WHERE
        tef.expert_id = :expert_id`;
  },
};
