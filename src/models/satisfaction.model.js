'use strict';
const Sequelize = require('sequelize');
const mentoringModel = require('./mentoring.model');

const { STRING, INTEGER, literal } = Sequelize;

module.exports = (sequelize) => {
  const satisfaction = sequelize.define(
    'satisfaction',
    /* Properties */
    {
      reply_id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: '만족도 조사 고유 번호',
      },
      mentoring_id: {
        type: STRING(36),
        primaryKey: true,
        references: {
          model: mentoringModel,
          key: 'mentoring_id',
        },
        comment: '멘토링 고유 번호',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '만족도 조사 생성일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '만족도 조사 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_satisfaction',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  satisfaction.associate = (models) => {};

  return satisfaction;
};
