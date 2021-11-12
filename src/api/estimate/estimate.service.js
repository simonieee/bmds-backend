import moment from 'moment';
import Container from 'typedi';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import EstimateItemService from '../estimate.item/estimate.item.service';
import EstimateQuery from './estimate.query';
export default class EstimateService {
  /**
   * 견적 등록
   * --
   * @param {Object} estimateInfo 견적 정보
   * @returns
   */
  async insertEstimate(estimateInfo) {
    const transaction = await models.sequelize.transaction();
    let result;
    try {
      const { estimate_item } = estimateInfo;
      const estimate_result = await models.estimate.create(estimateInfo, {
        transaction,
      });

      if (estimate_result) {
        const { estimate_id } = estimate_result;
        const itemTemp = estimate_item.map((item) => {
          return { ...item, estimate_id };
        });

        const item_result = await models.estimate_item.bulkCreate(itemTemp, {
          transaction,
        });

        result = { ...estimate_result, estimate_item: item_result };
      }

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[EstimateService][insertEstimate] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 견적 정보 목록 전체 조회
   * --
   * @returns
   */
  async getEstimateListAll() {
    try {
      const estimateQuery = EstimateQuery.getEstimateListAll();
      const result = await models.sequelize.query(estimateQuery, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[EstimateService][getEstimateList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 견적 정보 상세 조회
   * --
   * @param {Object} estimateInfo 견적 정보
   * @returns
   */
  async getEstimateDetail(estimateInfo) {
    try {
      const { estimate_id } = estimateInfo;

      const estimateQuery = EstimateQuery.getEstimate();
      const [estimate] = await models.sequelize.query(estimateQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { estimate_id },
      });
      const EstimateItemServiceInstance = Container.get(EstimateItemService);
      const estimate_item = await EstimateItemServiceInstance.getEstimateItem({
        estimate_id,
      });

      return { ...estimate, estimate_item };
    } catch (e) {
      console.log(e);
      logger.error(`[EstimateService][getEstimateDetail] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 견적 수정
   * --
   * @param {Object} estimateInfo 견적 정보
   * @returns
   */
  async updateEstimate(estimateInfo) {
    const transaction = await models.sequelize.transaction();
    let result;
    try {
      const { estimate_item } = estimateInfo;

      const {
        estimate_id,
        contact_nm,
        contact_tel,
        contact_date,
        contact_type,
        estimate_scale,
        estimate_status,
        estimate_request,
      } = estimateInfo;

      // 견적 정보 수정
      const estimate_result = await models.estimate.update(
        {
          contact_nm,
          contact_tel,
          contact_date,
          contact_type,
          estimate_scale,
          estimate_status,
          estimate_request,
        },
        { where: { estimate_id } },
        { transaction }
      );

      result = { ...result, estimate_result };

      if (estimate_item) {
        // 견적 상품 추가
        const addEstimateTemp = estimate_item
          .filter((item) => item.add)
          .map((item) => {
            return { ...item, estimate_id };
          });

        const item_add_result = await models.estimate_item.bulkCreate(
          addEstimateTemp,
          { transaction }
        );

        // 견적 상품 제거
        const removeEstimateTemp = estimate_item
          .filter((item) => item.remove)
          .map((item) => item.research_id);

        const item_remove_result = await models.estimate_item.destroy(
          { where: { estimate_id, research_id: removeEstimateTemp } },
          { transaction }
        );

        result = { ...result, item_add_result, item_remove_result };
      }

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[EstimateService][updateEstimate] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 견적 정보 삭제
   * --
   * @param {Object} estimateInfo 견적 정보
   * @returns
   */
  async deleteEstimate(estimateInfo) {
    try {
      const { estimate_id } = estimateInfo;
      const result = await models.estimate.destroy({ where: { estimate_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[EstimateService][deleteEstimate] Error ${e.message}`);
      throw e.message;
    }
  }
}
