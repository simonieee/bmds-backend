export default {
  getFieldList() {
    return `
    SELECT
      field_id,
      field_nm,
      field_desc
    FROM
        t_field;`;
  },
};
