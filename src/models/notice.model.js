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
        comment: '공지사항 고유 번호',
      },
      notice_title: {
        type: STRING(255),
        allowNull: false,
        comment: '공지사항 제목',
      },
      notice_content: {
        type: STRING(255),
        allowNull: false,
        comment: '공지사항 내용',
      },
      notice_hit: {
        type: INTEGER,
        allowNull: true,
        comment: '공지사항 조회수',
        defaultValue: 0,
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '공지사항 등록일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '공지사항 최근 수정일',
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
