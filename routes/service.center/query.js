export default {
  getNoticeList() {
    return `
    SELECT
        *
    FROM
        notice
    WHERE
        notice_id = :notice_id;`;
  },
};
