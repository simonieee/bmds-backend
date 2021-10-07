'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const notice = sequelize.define(
    'notice',
    /* Properties */
    {
      notice_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '자주묻는 질문 고유번호',
      },
      notice_title: {
        type: STRING(255),
        allowNull: false,
        comment: '자주 묻는 질문 제목',
      },
      notice_hit: {
        type: INTEGER,
        allowNull: false,
        comment: '자주 묻는 질문 설명',
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
      tableName: 't_notice',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  notice.associate = (models) => {
    notice.hasMany(models.notice_file, {
      foreignKey: {
        name: 'notice_id',
      },
    });
  };

  return notice;
};
