'use strict';
const Sequelize = require('sequelize');

const { INTEGER, UUIDV4, STRING, literal } = Sequelize;

module.exports = (sequelize) => {
  const service_type = sequelize.define(
    'service_type',
    /* Properties */
    {
      service_id: {
        type: STRING(36),
        primaryKey: true,
        defaultValue: UUIDV4,
        comment: '고객 고유번호',
      },
      service_nm: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 이름',
      },
      service_type_pw: {
        type: STRING(255),
        allowNull: false,
        comment: '고객 로그인 비밀번호',
      },
      service_type_tel: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '고객 전화번호',
      },
      service_type_mail: {
        type: STRING(255),
        allowNull: false,
        unique: true,
        comment: '고객 메일',
      },
      service_type_company: {
        type: STRING(255),
        allowNull: true,
        comment: '고객 소속',
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
      tableName: 't_service_type',
      freezeTableName: true,
      underscored: true,
      timestamps: false,
    }
  );

  /* Relations */
  service_type.associate = (models) => {
    service_type.hasMany(models.estimate, {
      foreignKey: {
        name: 'service_id',
      },
    });
  };

  return service_type;
};
