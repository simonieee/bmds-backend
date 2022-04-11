export default {
  loginExpert() {
    return `
    SELECT
        expert_id,
        expert_nm,
        expert_mail,
        expert_pw,
        expert_tel,
        expert_company,
        expert_img,
        expert_resume,
        expert_introduce,
        created_at,
        modified_at
    FROM
        t_expert
    WHERE
        expert_mail = :email
    AND
        expert_pw = :password;`;
  },
  getExpertList() {
    return `
      SELECT
        expert_id,
        expert_nm,
        expert_mail,
        expert_pw,
        expert_tel,
        expert_company,
        expert_img,
        expert_resume,
        expert_introduce,
        created_at,
        modified_at
      FROM
        t_expert;`;
  },
  getExpert() {
    return `
      SELECT
        expert_id,
        expert_nm,
        expert_mail,
        expert_pw,
        expert_tel,
        expert_company,
        expert_img,
        expert_resume,
        expert_introduce,
        created_at,
        modified_at
      FROM
        t_expert
      WHERE
        expert_id = :expert_id`;
  },
};
