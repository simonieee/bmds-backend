'use strict';
const { literal } = require('sequelize');
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING } = Sequelize;

module.exports = (sequelize) => {
  const expert = sequelize.define(
    'expert',
    /* Properties */
    {
      expert_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '전문가 고유번호',
      },
      expert_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '전문가 이름',
      },
      expert_mail: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '전문가 메일',
      },
      expert_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '전문가 로그인 비밀번호',
      },
      expert_tel: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '전문가 전화번호',
      },
      expert_company: {
        type: STRING(255),
        allowNull: true,
        comment: '전문가 소속',
      },
      expert_img: {
        type: STRING(255),
        allowNull: true,
        comment: '전문가 이미지',
      },
      expert_resume: {
        type: STRING(255),
        allowNull: true,
        comment: '전문가 이력서',
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
      tableName: 't_expert',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  expert.associate = (models) => {
    expert.hasMany(models.expert_field, {
      foreignKey: {
        name: 'expert_id',
        allowNull: true,
      },
    });
  };

  return expert;
};
