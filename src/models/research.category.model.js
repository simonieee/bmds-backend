'use strict';
const Sequelize = require('sequelize');

const { UUIDV4, STRING, ENUM, INTEGER, literal, TEXT } = Sequelize;

module.exports = (sequelize) => {
  const research_category = sequelize.define(
    'research_category',
    /* Properties */
    {
      category_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '조사 분류 고유 번호',
      },
      category_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '조사 분류 제목',
      },
      category_desc: {
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
      tableName: 't_research_category',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  research_category.associate = (models) => {
    research_category.hasMany(models.research, {
      foreignKey: {
        name: 'category_id',
      },
    });
  };

  return research_category;
};
