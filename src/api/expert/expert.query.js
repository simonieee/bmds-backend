export default {
  loginExpert() {
    return `
    SELECT
        expert_id,
        expert_nm,
        expert_mail,
        expert_tel,
        expert_addr,
        expert_company,
        expert_img,
        expert_resume,
        expert_birth,
        expert_gender,
        created_at,
        modified_at
    FROM
        t_expert
    WHERE
        expert_mail = :email
    AND
        expert_pw = :password;`;
  },
};
