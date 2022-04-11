'use strict';
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING, literal } = Sequelize;

module.exports = (sequelize) => {
  const estimate_type = sequelize.define(
    'estimate_type',
    /* Properties */
    {
      type_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '유형 고유번호',
      },
      type_title: {
        type: STRING(255),
        allowNull: false,
        comment: '서비스명',
      },
      type_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '서비스 설명',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '서비스 유형 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '서비스 유형 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_estimate_type',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  estimate_type.associate = (models) => {
    estimate_type.hasMany(models.estimate, {
      foreignKey: {
        name: 'type_id',
      },
    });
  };

  return estimate_type;
};
