'use strict';
const { literal } = require('sequelize');
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING } = Sequelize;

module.exports = (sequelize) => {
  const admin = sequelize.define(
    'admin',
    /* Properties */
    {
      admin_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '관리자 고유번호',
      },
      admin_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '관리자 이름',
      },
      admin_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '관리자 로그인 비밀번호',
      },
      admin_mail: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '고객 메일, 로그인 아이디',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '관리자 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '관리자 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_admin',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  admin.associate = (models) => {};

  return admin;
};
