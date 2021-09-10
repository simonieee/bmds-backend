export default {
  getCustomerListAll() {
    return `
    SELECT
        customer_id,
        customer_nm,
        customer_mail,
        customer_pw,
        customer_tel,
        customer_company,
        created_at,
        modified_at
    FROM
        t_customer;`;
  },
  getCustomerDetail() {
    return `
    SELECT
        customer_id,
        customer_nm,
        customer_mail,
        customer_pw,
        customer_tel,
        customer_company,
        created_at,
        modified_at
    FROM
        t_customer
    WHERE
        customer_id = :customer_id;`;
  },
  loginCustomer() {
    return `
    SELECT
      customer_id,
      customer_nm,
      customer_mail,
      customer_tel,
      customer_company,
      created_at,
      modified_at
    FROM
      t_customer
    WHERE
      customer_mail = :email
    AND
      customer_pw = :password;
    `;
  },
};
