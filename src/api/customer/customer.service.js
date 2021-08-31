import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import CustomerQuery from './customer.query';
export default class CustomerService {
  /**
   * 고객 정보 등록
   * --
   * @param {Object} customerInfo
   * @returns
   */
  async insertCustomer(customerInfo) {
    try {
      const result = await models.customer.create(customerInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][insertCustomer] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 고객 전체 목록 조회
   * --
   * @returns
   */
  async getCustomerListAll() {
    try {
      const query = CustomerQuery.getCustomerListAll();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][getCustomerListAll] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   * 고객 상세정보 조회
   * --
   * @param {Object} customerInfo
   * @returns
   */
  async getCustomerDetail(customerInfo) {
    try {
      const { customer_id } = customerInfo;
      const query = CustomerQuery.getCustomerDetail();
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][getCustomerDetail] Error ${e.message}`);
      throw e.message;
    }
  }

  async loginCustomer(customerInfo) {
    try {
      const { email, password } = customerInfo;
      const query = CustomerQuery.loginCustomer();
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { email, password },
      });
      if (!result) {
        throw new Error('회원정보가 일치하지 않습니다.');
      }
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[CustomerService][loginCustomer] Error ${e.message}`);
      throw e;
    }
  }
}
