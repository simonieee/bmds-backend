'use strict';
const Sequelize = require('sequelize');
const estimate = require('./estimate.model');
const research = require('./research.model');

const { STRING, INTEGER, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const estimate_item = sequelize.define(
    'estimate_item',
    /* Properties */
    {
      estimate_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: estimate,
          key: 'estimate_id',
        },
        comment: '견적 고유번호',
      },
      research_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: research,
          key: 'research_id',
        },
        comment: '전문가 고유번호',
      },
      estimate_price: {
        type: INTEGER,
        allowNull: true,
        comment: '견적가',
      },
      estimate_content: {
        type: TEXT,
        allowNull: true,
        comment: '견적내용',
      },
    },
    /* options */
    {
      tableName: 't_estimate_item',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  estimate_item.associate = (models) => {};

  return estimate_item;
};
