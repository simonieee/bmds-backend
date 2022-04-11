import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import EstimateTypeQuery from './estimate.type.query';
export default class EstimateTypeService {
  /**
   * 견적 타입 정보 등록
   * --
   * @param {Object} typeInfo 견적 타입 정보
   * @returns
   */
  async insertEstimateType(typeInfo) {
    try {
      const { types } = typeInfo;
      if (types) {
        const result = await models.estimate_type.bulkCreate(types);
        return result;
      }
      const result = await models.estimate_type.create(typeInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateTypeService][insertEstimateType] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 견적 타입 정보 조회
   * --
   * @returns
   */
  async getEstimateType() {
    try {
      const query = EstimateTypeQuery.getEstimateType();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[EstimateTypeService][getEstimateType] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 견적 타입 정보 수정
   * --
   * @param {Object} typeInfo 견적타입 정보
   * @returns
   */
  async updateEstimateType(typeInfo) {
    try {
      const { type_id, type_title, type_desc } = typeInfo;
      const result = await models.estimate_type.update(
        {
          type_title,
          type_desc,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        { where: { type_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateTypeService][updateEstimateType] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 견적 타입 정보 삭제
   * --
   * @param {Object} typeInfo 견적 타입 정보
   * @returns
   */
  async deleteEstimateType(typeInfo) {
    try {
      const { type_id } = typeInfo;
      const result = await models.estimate_type.destroy({ where: { type_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateTypeService][deleteEstimateType] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
