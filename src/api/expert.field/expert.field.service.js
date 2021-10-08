import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ExpertFieldQuery from './expert.field.query';
export default class ExpertFieldService {
  /**
   * 전문가 분야 등록
   * --
   * @param {Object} fieldInfo 전문가 분야 정보
   * @returns
   */
  async insertExpertField(fieldInfo) {
    try {
      const { expert_fields } = fieldInfo;
      if (expert_fields) {
        const result = await models.expert_field.bulkCreate(expert_fields);
        return result;
      }

      const result = await models.expert_field.create(fieldInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ExpertFieldService][insertExpertField] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 전문가 분야 정보 조회
   * --
   * @param {Object} fieldInfo 전문가 분야 정보
   * @returns
   */
  async getExpertField(fieldInfo) {
    try {
      const { expert_id } = fieldInfo;
      const query = ExpertFieldQuery.getExpertField();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { expert_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ExpertFeildService][getExpertField] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 분야 삭제
   * --
   * @param {Object} fieldInfo 전문가 분야 정보
   */
  async deleteExpertField(fieldInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { expert_fields } = fieldInfo;
      let result;
      if (expert_fields) {
        const removePromise = expert_fields.map(async (item) => {
          const { expert_id, field_id } = item;
          const res = await models.expert_field.destroy({
            where: { expert_id, field_id },
          });
          return res;
        });
        result = await Promise.all(removePromise);
      }
      result = await models.expert_field.destroy({ where: fieldInfo });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(
        `[ExpertFieldService][deleteExpertField] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
