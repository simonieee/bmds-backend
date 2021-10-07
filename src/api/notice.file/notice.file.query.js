export default {
  getNoticeFile() {
    return `
    SELECT
        file_id,
        notice_id,
        file_nm,
        file_url,
        created_at,
        modified_at
    FROM
        t_notice_file
    WHERE
        notice_id = :notice_id;`;
  },
};
