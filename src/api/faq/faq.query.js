export default {
  getFaqList() {
    return `
    SELECT
        faq_id,
        faq_title,
        faq_desc,
        faq_type,
        created_at,
        modified_at
    FROM
        t_faq;`;
  },
};
