export default {
  getVoucherListAll() {
    return `
    SELECT
        tv.voucher_id,
        tv.customer_id,
        tv.voucher_type,
        tv.voucher_usage,
        tv.reference_id,
        tv.created_at,
        tv.modified_at,
        tc.customer_nm
    FROM
        t_voucher tv
        INNER JOIN t_customer tc ON tc.customer_id = tv.customer_id;`;
  },
  getVoucherListByCustomer() {
    return `
    SELECT
        tv.voucher_id,
        tv.customer_id,
        tv.voucher_type,
        tv.voucher_usage,
        tv.reference_id,
        tv.created_at,
        tv.modified_at
    FROM
        t_voucher tv
    WHERE
        tv.customer_id = :customer_id;`;
  },
  getVoucherListByVoucher() {
    return `
    SELECT
        tv.voucher_id,
        tv.customer_id,
        tv.voucher_type,
        tv.voucher_usage,
        tv.reference_id,
        tv.created_at,
        tv.modified_at,
        tc.customer_nm
    FROM
        t_voucher tv
        INNER JOIN t_customer tc ON tc.customer_id = tv.customer_id
    WHERE
        tv.voucher_type = :voucher_type;`;
  },
  getVoucher() {
    return `
    SELECT
        tv.voucher_id,
        tv.customer_id,
        tv.voucher_type,
        tv.voucher_usage,
        tv.reference_id,
        tv.created_at,
        tv.modified_at,
        tc.customer_nm
    FROM
        t_voucher tv
        INNER JOIN t_customer tc ON tc.customer_id = tv.customer_id
    WHERE
        tv.voucher_id = :voucher_id
    AND
        tv.voucher_usage = false`;
  },
  checkVoucher() {
    return `
    SELECT
        COUNT(*) as check_count
    FROM
        t_voucher
    WHERE
        customer_id = :customer_id
    AND
        voucher_usage = false;`;
  },
  getUnusedVoucher() {
    return `
    SELECT
        voucher_id,
        customer_id,
        voucher_type,
        voucher_usage,
        reference_id,
        created_at,
        modified_at
    FROM
        t_voucher
    WHERE
        customer_id = :customer_id
    AND
        voucher_usage = false
    ORDER BY
        created_at ASC
    LIMIT 1;`;
  },
};
