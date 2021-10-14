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
    const transaction = await models.sequelize.transaction();
    try {
      const { customer_field } = customerInfo;
      const result = await models.customer.create(customerInfo);

      let customer_fields;
      if (customer_field) {
        const { customer_id } = result;
        const customerFieldTemp = customer_field.map((itme) => {
          return { ...itme, customer_id };
        });
        customer_fields = await models.customer_field.bulkCreate(
          customerFieldTemp
        );
      }
      await transaction.commit();
      return { ...result, customer_field: customer_fields };
    } catch (e) {
      await transaction.rollback();
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

      const customerFieldPromise = result.map(async (item) => {
        const { customer_id } = item;
        const query = CustomerQuery.getCustomerField();
        const customer_field = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: { customer_id },
        });
        return { ...item, customer_field };
      });

      const customer = await Promise.all(customerFieldPromise);
      return customer;
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

  /**
   * 고객 정보 수정
   * --
   * @param {Object} customerInfo 고객 정보
   * @returns
   */
  async updateCustomer(customerInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const {
        customer_id,
        customer_nm,
        customer_pw,
        customer_tel,
        customer_company,
        customer_field,
      } = customerInfo;
      const result = await models.customer.update(
        {
          customer_nm,
          customer_pw,
          customer_tel,
          customer_company,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        { where: { customer_id } },
        { transaction }
      );

      if (customer_field) {
        const addField = customer_field
          .filter((item) => item.add)
          .map((item) => {
            return { ...item, customer_id };
          });
        await models.customer_field.bulkCreate(addField, { transaction });
        const removeField = customer_field.filter((item) => item.remove);
        await models.customer_field.destroy(
          { where: { expert_id, field_id: removeField } },
          { transaction }
        );
      }

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[CustomerService][updateCustomer] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 고객 로그인
   * --
   * @param {Object} customerInfo 고객 로그인
   * @returns
   */
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
