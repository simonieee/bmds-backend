import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import EstimateItemQuery from './estimate.item.query';
export default class EstimateItemService {
  /**
   * 견적 상품 정보 등록
   * --
   * @param {Object} itemInfo 견적 상품 정보
   * @returns
   */
  async insertEstimateItem(itemInfo) {
    try {
      const { estimates } = itemInfo;
      if (estimates) {
        const result = await models.estimate_item.bulkCreate(estimates);
        return result;
      }

      const result = await models.estimate_item.create(itemInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateItemService][insertEstimateItem] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 견적 상품 정보 조회
   * --
   * @param {Object} itemInfo 견적 상품 정보
   * @returns
   */
  async getEstimateItem(itemInfo) {
    try {
      const { estimate_id } = itemInfo;
      const query = EstimateItemQuery.getEstimateItem();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { estimate_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[EstimateItemService][getEstimateItem] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 서비스별 견적 상품 정보 조회
   * --
   * @param {Object} itemInfo 견적 상품 정보
   * @returns
   */
  async getEstimateItemByResearch(itemInfo) {
    try {
      const { estimate_id, research_id } = itemInfo;
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { estimate_id, research_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateItemService][getEstimateItemByResearch] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 견적 상품 정보 수정
   * --
   * @param {Object} itemInfo 견적 상품 정보
   * @returns
   */
  async updateEstimateItem(itemInfo) {
    try {
      const { estimate_id, research_id, estimate_price, estimate_content } =
        itemInfo;
      const result = await models.estimate_item.update(
        { research_id, estimate_price, estimate_content },
        { where: { estimate_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateItemService][updateEstimateItem] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 견적 상품 정보 삭제
   * --
   * @param {Object} itemInfo 견작 상품 정보
   * @returns
   */
  async deleteEstimateItem(itemInfo) {
    try {
      const { estimate_id, research_id } = itemInfo;
      const result = await models.estimate_item.destroy({
        where: { estimate_id, research_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[EstimateItemService][deleteEstimateItem] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
