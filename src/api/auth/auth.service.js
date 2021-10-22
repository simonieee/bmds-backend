import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ExpertService from '../expert/expert.service';
import CustomerService from '../customer/customer.service';
import AdminService from '../admin/admin.service';
import AuthQuery from './auth.query';
import Container from 'typedi';

export default class AuthService {
  /**
   * 전문가 로그인 요청
   * --
   * @param {Object} expertInfo 전문가 로그인 정보
   * @returns
   */
  async loginExpert(expertInfo) {
    try {
      const ExpertServiceInstance = Container.get(ExpertService);
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
   * 고객 로그인 요청
   * --
   * @param {Object} customerInfo 고객 로그인 정보
   * @returns
   */
  async loginCustomer(customerInfo) {
    try {
      const CustomerServiceInstance = Container.get(CustomerService);
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

  /**
   * 관리자 로그인 요청
   * --
   * @param {Object} adminInfo 관리자 정보
   * @returns
   */
  async loginAdmin(adminInfo) {
    try {
      const AdminServiceInstance = Container.get(AdminService);
      const [result] = await AdminServiceInstance.loginAdmin(adminInfo);
      const JW = new JWTManager();
      const token = await JW.createSign(result, '3h');
      return { ...result, token };
    } catch (e) {
      console.log(e);
      logger.error(`[AuthService][loginAdmin] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 통합 로그인 처리
   * --
   * @param {Object} loginInfo 로그인 정보
   */
  async loginTotal(loginInfo) {
    try {
      const { login_mail, login_pw } = loginInfo;

      const query = AuthQuery.checkUser();
      const [{ admin_count, customer_count, expert_count }] =
        await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: { email: login_mail },
        });

      let result;

      if (admin_count) {
        const serviceInstance = Container.get(AdminService);
        result = await serviceInstance.loginAdmin({
          admin_mail: login_mail,
          admin_pw: login_pw,
        });
        result.user_type = 'ADMIN';
      } else if (customer_count) {
        const serviceInstance = Container.get(CustomerService);
        result = await serviceInstance.loginCustomer({
          email: login_mail,
          password: login_pw,
        });
        result.user_type = 'CUSTOMER';
      } else if (expert_count) {
        const serviceInstance = Container.get(ExpertService);
        result = await serviceInstance.loginExpert({
          email: login_mail,
          password: login_pw,
        });
        result.user_type = 'EXPERT';
      } else {
        throw new Error('회원정보가 존재하지 않습니다.');
      }
      const JW = new JWTManager();
      const token = await JW.createSign(result, '3h');
      return { ...result, token };
    } catch (e) {
      console.log(e);
      logger.error(`[AuthService][loginTotal] Error ${e.message}`);
      throw e.message;
    }
  }
}
