import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import VoucherQuery from './voucher.query';
export default class VoucherService {
  /**
   * 이용권 등록
   * --
   * @param {Object} voucherInfo 이용권 정보
   * @returns
   */
  async insertVoucher(voucherInfo) {
    try {
      const { vouchers } = voucherInfo;
      if (vouchers) {
        const result = await models.voucher.bulkCreate(vouchers);
        return result;
      }

      const result = await models.voucher.create(voucherInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[VoucherService][insertVoucher] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 이용권 전체 조회
   * --
   * @returns
   */
  async getVoucherListAll() {
    try {
      const query = VoucherQuery.getVoucherListAll();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[VoucherService][getVoucherList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 고객별 이용권 조회
   * --
   * @param {Object} voucherInfo 이용권 정보
   * @returns
   */
  async getVoucherListByCustomer(voucherInfo) {
    try {
      const { customer_id } = voucherInfo;
      const query = VoucherQuery.getVoucherListByCustomer();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[VoucherService][getVoucherListByCustomer] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 유형별 이용권 조회
   * --
   * @param {Object} voucherInfo 이용권 조회
   * @returns
   */
  async getVoucherListByVoucher(voucherInfo) {
    try {
      const { voucher_type } = voucherInfo;
      const query = VoucherQuery.getVoucherListByVoucher();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { voucher_type },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[VoucherService][getVoucherListByVoucher] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 이용권 사용하기
   * --
   * @param {Object} voucherInfo 이용권 정보
   * @returns
   */
  async useVoucher(voucherInfo) {
    try {
      const { voucher_id, reference_id } = voucherInfo;
      const checkQuery = VoucherQuery.getVoucher();
      const [check] = await models.sequelize.query(checkQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { voucher_id },
      });

      if (!check) {
        throw new Error('사용할 수 없는 이용권입니다.');
      }
      const result = await models.voucher.update(
        {
          reference_id,
          usage: true,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        { where: { voucher_id } }
      );

      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[VoucherService][useVoucher] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 이용권 삭제
   * --
   * @param {Object} voucherInfo 이용권 정보
   * @returns
   */
  async deleteVoucher(voucherInfo) {
    try {
      const { voucher_id } = voucherInfo;
      const result = await models.voucher.destroy({ where: { voucher_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[VoucherService][deleteVoucher] Error ${e.message}`);
      throw e.message;
    }
  }
}
