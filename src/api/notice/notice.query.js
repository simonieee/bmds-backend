export default {
  getNoticeList() {
    return `
    SELECT
        tn.notice_id,
        tn.notice_title,
        tn.notice_content,
        tn.notice_hit,
        tn.created_at,
        tn.modified_at,
        (SELECT COUNT(*) FROM t_notice_file WHERE notice_id = tn.notice_id) as isFile
    FROM
        t_notice tn`;
  },
};
