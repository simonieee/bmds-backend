import moment from 'moment';
import models from '../../../models';
import JWTManager from '../../../utils/JWTManager';
import { logger } from '../../../utils/winstonLogger';
import BMQuery from './bm.query';
import VoucherQuery from '../../voucher/voucher.query';
export default class BMService {
  /**
   * 비즈니스 모델 정보 입력
   * --
   * @param {Object} bmInfo 비즈니스 모델 정보
   * @returns
   */
  async insertBM(bmInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { customer_id } = bmInfo;
      const voucherQuery = VoucherQuery.getUnusedVoucher();
      const [voucher] = await models.sequelize.query(voucherQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });

      if (!voucher) {
        throw new Error('이용가능한 사용권이 없습니다.');
      }

      const result = await models.bm.create(bmInfo, { transaction });

      const { bm_id } = result;

      const { voucher_id } = voucher;

      await models.voucher.update(
        {
          voucher_usage: true,
          reference_id: bm_id,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        { where: { voucher_id } },
        { transaction }
      );

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[BMService][insertBM] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   * 비즈니스 모델 전체 정보 조회
   * --
   * @returns
   */
  async getBMAll() {
    try {
      const query = BMQuery.getBMAll();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMService][getBMAll] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 고객별 비즈니스 모델 정보 조회
   * --
   * @param {Object} bmInfo 비즈니스 모델 정보
   * @returns
   */
  async getBMByCustomer(bmInfo) {
    try {
      const { customer_id } = bmInfo;
      const query = BMQuery.getBMByCustomer();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMService][getBM] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 비즈니스 모델 정보 수정
   * --
   * @param {Object} bmInfo 비즈니스 모델 정보
   * @returns
   */
  async updateBM(bmInfo) {
    try {
      const { bm_id, bm_type, bm_title, bm_desc } = bmInfo;

      const result = await models.bm.update(
        {
          bm_type,
          bm_title,
          bm_desc,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        { where: { bm_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMService][updateBM] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 비즈니스 모델 정보 삭제
   * --
   * @param {Object} bmInfo 비즈니스 모델 정보
   * @returns
   */
  async deleteBM(bmInfo) {
    try {
      const { bm_id } = bmInfo;
      const result = await models.bm.destroy({ where: { bm_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMServie][deleteBM] Error ${e.message}`);
      throw e.message;
    }
  }
}
