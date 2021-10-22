export default {
  checkUser() {
    return `
    SELECT
    (
        SELECT
            COUNT(*)
        FROM
            t_admin
        WHERE
            admin_mail = :email
    ) as admin_count
    ,
    (
        SELECT
            COUNT(*)
        FROM
            t_customer
        WHERE
            customer_mail = :email
    ) as customer_count
    ,
    (
        SELECT
            COUNT(*)
        FROM
            t_expert
        WHERE
            expert_mail = :email
    ) as expert_count
    `;
  },
};
