'use strict';
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING, ENUM, TEXT, literal } = Sequelize;

module.exports = (sequelize) => {
  const mentoring = sequelize.define(
    'mentoring',
    /* Properties */
    {
      mentoring_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '멘토링 고유번호',
      },
      mentoring_status: {
        type: ENUM(['APPLICATION', 'RESERVATION', 'DONE', 'CANCEL']),
        allowNull: false,
        comment: '멘토링 상태',
      },
      mentoring_review: {
        type: TEXT,
        allowNull: false,
        comment: '멘토링 후기',
      },
      reversation_schedule: {
        type: INTEGER,
        allowNull: false,
        unique: true,
        comment: '멘토링 예약 날짜/시간',
      },
      mentoring_file: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '멘토링 첨부 파일',
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
      tableName: 't_mentoring',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  mentoring.associate = (models) => {
    mentoring.belongsTo(models.customer, {
      foreignKey: {
        name: 'customer_id',
      },
    });
    mentoring.belongsTo(models.expert, {
      foreignKey: {
        name: 'expert_id',
      },
    });
  };

  return mentoring;
};
