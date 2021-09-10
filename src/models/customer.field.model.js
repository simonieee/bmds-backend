'use strict';
const Sequelize = require('sequelize');
const field = require('./field.model');
const customer = require('./customer.model');

const { STRING } = Sequelize;

module.exports = (sequelize) => {
  const customer_field = sequelize.define(
    'customer_field',
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
      customer_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: customer,
          key: 'customer_id',
        },
        comment: '전문가 고유번호',
      },
    },
    /* options */
    {
      tableName: 't_customer_field',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  customer_field.associate = (models) => {};

  return customer_field;
};
