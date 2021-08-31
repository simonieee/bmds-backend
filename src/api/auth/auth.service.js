import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ExpertService from '../expert/expert.service';
import CustomerService from '../customer/customer.service';

export default class AuthService {
  /**
   * 전문가 로그인 요청
   * --
   * @param {Object} expertInfo 전문가 로그인 정보
   * @returns
   */
  async loginExpert(expertInfo) {
    try {
      const ExpertServiceInstance = new ExpertService();
      const result = await ExpertServiceInstance.loginExpert(expertInfo);
      const JW = new JWTManager();
      const token = await JW.createSign(result, '3h');
      return { ...result, token };
    } catch (e) {
      console.log(e);
      logger.error(`[AuthService][loginExpert] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   *
   * --
   * @param {Object} customerInfo 고객 로그인 요청
   * @returns
   */
  async loginCustomer(customerInfo) {
    try {
      const CustomerServiceInstance = new CustomerService();
      const result = await CustomerServiceInstance.loginCustomer(customerInfo);
      const JW = new JWTManager();
      const token = await JW.createSign(result, '3h');
      return { ...result, token };
    } catch (e) {
      console.log(e);
      logger.error(`[AuthService][loginCustomer] Error ${e.message}`);
      throw e.message;
    }
  }

  async loginAdmin(adminInfo) {
    try {
      return 1;
    } catch (e) {
      console.log(e);
      logger.error(`[AuthService][loginAdmin] Error ${e.message}`);
      throw e.message;
    }
  }
}
