'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, DATE } = Sequelize;

module.exports = (sequelize) => {
  const schedule = sequelize.define(
    'schedule',
    /* Properties */
    {
      schedule_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '고객 고유번호',
      },
      schedule_date: {
        type: DATE,
        allowNull: false,
        comment: '고객 이름',
      },
      schedule_time: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 로그인 비밀번호',
      },
    },
    /* options */
    {
      tableName: 't_schedule',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  schedule.associate = (models) => {
    schedule.belongsTo(models.expert, {
      foreignKey: {
        name: 'expert_id',
      },
    });
  };

  return schedule;
};
