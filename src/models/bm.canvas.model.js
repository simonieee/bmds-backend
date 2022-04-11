'use strict';
const Sequelize = require('sequelize');
const bm = require('./bm.model');

const { STRING, ENUM, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const bm_canvas = sequelize.define(
    'bm_canvas',
    /* Properties */
    {
      bm_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: bm,
          key: 'bm_id',
        },
        comment: '비즈니스 모델 고유번호',
      },
      bm_board: {
        type: ENUM([
          'MARKET_INSIGHT',
          'SEGEMENTATION',
          'ALTERNATIVE',
          'SOLUTIONS',
          'VALUE_PROPOSITION',
          'KEY_RESOURCE',
          'KEY_PARTNERS',
          'REVENUE_STRUCTURE',
          'KEY_ACTIVITIES',
          'FEEDBACK',
          'EXPERIENCE',
        ]),
        primaryKey: true,
        defaultValue: 'MARKET_INSIGHT',
        comment: '비즈니스 모델 캔버스 타입',
      },
      bm_block1: {
        type: TEXT,
        allowNull: true,
        comment: '캔버스 입력1',
      },
      bm_block2: {
        type: TEXT,
        allowNull: true,
        comment: '캔버스 입력2',
      },
      bm_block3: {
        type: TEXT,
        allowNull: true,
        comment: '캔버스 입력3',
      },
    },
    /* options */
    {
      tableName: 't_business_model_canvas',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  bm_canvas.associate = (models) => {};

  return bm_canvas;
};
