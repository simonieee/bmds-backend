'use strict';
const Sequelize = require('sequelize');
const field = require('./field.model');
const expert = require('./expert.model');

const { STRING } = Sequelize;

module.exports = (sequelize) => {
  const expert_field = sequelize.define(
    'expert_field',
    /* Properties */
    {
      field_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: field,
          key: 'field_id',
        },
        comment: '전문분야 고유번호',
      },
      expert_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: expert,
          key: 'expert_id',
        },
        comment: '전문가 고유번호',
      },
    },
    /* options */
    {
      tableName: 't_expert_field',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  expert_field.associate = (models) => {};

  return expert_field;
};
