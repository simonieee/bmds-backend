export default {
  getAdminList() {
    return `
    SELECT
        admin_id,
        admin_mail,
        admin_pw,
        admin_nm,
        created_at,
        modified_at
    FROM
        t_admin`;
  },
  loginAdmin() {
    return `
    SELECT
        admin_id,
        admin_mail,
        admin_nm,
        created_at,
        modified_at
    FROM
        t_admin
    WHERE
        admin_mail = :admin_mail
    AND
        admin_pw = :admin_pw`;
  },
};
