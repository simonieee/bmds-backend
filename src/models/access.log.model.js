'use strict';
const Sequelize = require('sequelize');

const { STRING, INTEGER, ENUM, literal } = Sequelize;

module.exports = (sequelize) => {
  const access_log = sequelize.define(
    'access_log',
    /* Properties */
    {
      access_log_id: {
        type: INTEGER,
        primaryKey: true,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '로그 고유 번호',
      },
      access_type: {
        type: ENUM(['ADMIN', 'CUSTOMER', 'EXPERT']),
        allowNull: false,
        defaultValue: 'CUSTOMER',
        comment: '접근 유저 타입',
      },
      access_log: {
        type: STRING(255),
        allowNull: false,
        comment: '전문 분야 명칭',
      },
      access_log_result: {
        type: STRING,
        allowNull: false,
        comment: '전문 분야 설명',
      },
    },
    /* options */
    {
      tableName: 't_access_log',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  access_log.associate = (models) => {};

  return access_log;
};
