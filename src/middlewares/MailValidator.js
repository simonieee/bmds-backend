import models from '../models';

const query = `
SELECT
    (
        (
            SELECT
                COUNT(*)
            FROM
                t_admin
            WHERE
                admin_mail = :email
        )
        +
        (
            SELECT
                COUNT(*)
            FROM
                t_customer
            WHERE
                customer_mail = :email
        )
        +
        (
            SELECT
                COUNT(*)
            FROM
                t_expert
            WHERE
                expert_mail = :email
        )
    ) as email_count;`;

/**
 * 메일 중복 검사
 * --
 */
export default async (req, res, next) => {
  let email;

  const { expert_mail, customer_mail, admin_mail } = req.body;

  if (expert_mail) {
    email = expert_mail;
  } else if (customer_mail) {
    email = customer_mail;
  } else {
    email = admin_mail;
  }

  const temp = email.includes('@');
  if (!temp) {
    return res.status(400).send({
      status: 400,
      message: '메일 양식이 아닙니다.',
      data: null,
    });
  }

  const [{ email_count }] = await models.sequelize.query(query, {
    type: models.sequelize.QueryTypes.SELECT,
    replacements: { email },
  });

  if (email_count) {
    return res.status(400).send({
      status: 400,
      message: '이미 사용중인 이메일입니다.',
      data: null,
    });
  }

  next();
};
