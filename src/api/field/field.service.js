import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import FieldQuery from './field.query';
export default class FieldService {
  /**
   * 필드 정보 등록
   * --
   * @param {Object} fieldInfo 필드 정보
   * @returns
   */
  async insertField(fieldInfo) {
    try {
      const { fields } = fieldInfo;
      if (fields) {
        const result = await models.field.bulkCreate(fields);
        return result;
      }
      const result = await models.field.create(fieldInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FieldService][insertField] Error ${e.message}`);
      throw e.message;
    }
  }

  async getFieldList() {
    try {
      const query = FieldQuery.getFieldList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FieldService][getFieldList] Error ${e.message}`);
      throw e.message;
    }
  }
}
