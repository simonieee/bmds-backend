'use strict';
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING, ENUM, literal } = Sequelize;

module.exports = (sequelize) => {
  const estimate = sequelize.define(
    'estimate',
    /* Properties */
    {
      estimate_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '견적 고유번호',
      },
      contact_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '요청 고객 이름',
      },
      estimate_tel: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '요청 고객 전화번호',
      },
      estimate_date: {
        type: STRING(255),
        allowNull: false,
        comment: '예약 일자',
      },
      estimate_type: {
        type: ENUM(['OFFLINE', 'ONLINE']),
        allowNull: false,
        unique: true,
        comment: '진행방식',
      },
      estimate_scale: {
        type: STRING(255),
        allowNull: true,
        comment: '규모',
      },
      estimate_img: {
        type: STRING(255),
        allowNull: true,
        comment: '전문가 이미지',
      },
      estimate_resume: {
        type: STRING(255),
        allowNull: true,
        comment: '전문가 이력서',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '견적 등록일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '견적 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_estimate',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  estimate.associate = (models) => {
    estimate.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
      },
    });
    estimate.belongsTo(models.service_type, {
      foreignKey: {
        name: 'service_id',
      },
    });
  };

  return estimate;
};
