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
        comment: '유형 고유번호',
      },
      service_title: {
        type: STRING(255),
        allowNull: false,
        comment: '서비스명',
      },
      service_desc: {
        type: STRING(255),
        allowNull: false,
        comment: '서비스 설명',
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
