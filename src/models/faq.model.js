'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal } = Sequelize;

module.exports = (sequelize) => {
  const faq = sequelize.define(
    'faq',
    /* Properties */
    {
      faq_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '자주묻는 질문 고유번호',
      },
      faq_title: {
        type: STRING(255),
        allowNull: false,
        comment: '자주 묻는 질문 제목',
      },
      faq_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '자주 묻는 질문 설명',
      },
      faq_type: {
        type: ENUM(['BM', 'PLAN', 'EXPERT', 'VOUCHER', 'REFUND']),
        allowNull: false,
        comment: '자주 묻는 질문 타입',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '고객 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '고객 수정일',
      },
    },
    /* options */
    {
      tableName: 't_faq',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  faq.associate = (models) => {};

  return faq;
};
