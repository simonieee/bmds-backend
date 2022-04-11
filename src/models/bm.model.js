'use strict';
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING, literal, ENUM, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const bm = sequelize.define(
    'bm',
    /* Properties */
    {
      bm_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '비즈니스 모델 고유번호',
      },
      bm_type: {
        type: ENUM(['DEFAULT', 'SERVICE', 'PLATFORM', 'KNOWLEDGE_SERVICE']),
        allowNull: false,
        defaultValue: 'DEFAULT',
        comment: '비즈니스 모델 타입',
      },
      bm_title: {
        type: STRING(255),
        allowNull: false,
        comment: '비즈니스 모델 제목',
      },
      bm_desc: {
        type: TEXT,
        allowNull: false,
        unique: true,
        comment: '비즈니스 모델 설명',
      },
      bm_color: {
        type: STRING(255),
        allowNull: false,
        comment: '비즈니스 모델 색상',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '비즈니스 모델 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '비즈니스 모델 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_business_model',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  bm.associate = (models) => {
    bm.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
      },
    });
  };

  return bm;
};
