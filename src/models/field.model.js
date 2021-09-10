'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING } = Sequelize;

module.exports = (sequelize) => {
  const field = sequelize.define(
    'field',
    /* Properties */
    {
      field_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '전문분야 고유번호',
      },
      field_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '전문 분야 명칭',
      },
      field_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '전문 분야 설명',
      },
    },
    /* options */
    {
      tableName: 't_field',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  field.associate = (models) => {
    field.hasMany(models.customer_field, {
      foreignKey: {
        name: 'field_id',
      },
    });
    field.hasMany(models.expert_field, {
      foreignKey: {
        name: 'field_id',
      },
    });
  };

  return field;
};
