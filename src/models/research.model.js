'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const research = sequelize.define(
    'research',
    /* Properties */
    {
      research_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '조사 고유 번호',
      },
      research_title: {
        type: STRING(255),
        allowNull: false,
        comment: '조사 분류 제목',
      },
      research_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '조사 분류 내용',
      },
      created_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '조사 분류 등록일',
      },
      modified_at: {
        type: INTEGER,
        defaultValue: literal('UNIX_TIMESTAMP()'),
        comment: '조사 분류 최근 수정일',
      },
    },
    /* options */
    {
      tableName: 't_research',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  research.associate = (models) => {
    research.belongsTo(models.research_category, {
      foreignKey: {
        name: 'category_id',
      },
    });
  };

  return research;
};
