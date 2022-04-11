'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal, BOOLEAN } = Sequelize;

module.exports = (sequelize) => {
  const voucher = sequelize.define(
    'voucher',
    /* Properties */
    {
      voucher_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '이용권 고유번호',
      },
      voucher_type: {
        type: ENUM(['BM', 'PLAN', 'EXPERT', 'VOUCHER', 'REFUND']),
        allowNull: false,
        comment: '이용권 유형',
      },
      voucher_usage: {
        type: BOOLEAN,
        allowNull: true,
        comment: '이용권 유형',
        defaultValue: false,
      },
      reference_id: {
        type: STRING,
        allowNull: true,
        comment: '사용처',
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
      tableName: 't_voucher',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  voucher.associate = (models) => {
    voucher.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
      },
    });
  };

  return voucher;
};
