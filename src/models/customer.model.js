'use strict';
const { literal } = require('sequelize');
const Sequelize = require('sequelize');

const { INTEGER, BOOLEAN, UUIDV4, STRING, NOW, DATE } = Sequelize;

module.exports = (sequelize) => {
  const customer = sequelize.define(
    'customer',
    /* Properties */
    {
      customer_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '고객 고유번호',
      },
      customer_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 이름',
      },
      customer_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 로그인 비밀번호',
      },
      customer_tel: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '고객 전화번호',
      },
      customer_addr: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 주소',
      },
      customer_mail: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '고객 메일',
      },
      customer_company: {
        type: STRING(255),
        allowNull: true,
        comment: '고객 소속',
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
      tableName: 't_customer',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  customer.associate = (models) => {};

  return customer;
};
