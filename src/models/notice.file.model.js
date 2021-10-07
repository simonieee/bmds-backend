'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal } = Sequelize;

module.exports = (sequelize) => {
  const notice_file = sequelize.define(
    'notice_file',
    /* Properties */
    {
      file_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '자주묻는 질문 고유번호',
      },
      file_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '자주 묻는 질문 제목',
      },
      file_url: {
        type: STRING(255),
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
      tableName: 't_notice_file',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  notice_file.associate = (models) => {
    notice_file.hasMany(models.notice, {
      foreignKey: {
        name: 'notice_id',
      },
    });
  };

  return notice_file;
};
