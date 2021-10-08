import { isArray } from 'lodash';
import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import CustomerFieldQuery from './customer.field.query';
export default class CustomerFieldService {
  /**
   * 고객 전문분야 등록
   * --
   * @param {Object} fieldInfo 고객 전문분야 정보
   * @returns
   */
  async insertCustomerField(fieldInfo) {
    try {
      const { customer_fields } = fieldInfo;
      if (customer_fields) {
        const result = await models.customer_field.bulkCreate(customer_fields);
        return result;
      }
      const result = await models.customer_field.create(fieldInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CustomerFieldService][insertCustomerField] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 고객 전문 분야 조회
   * --
   * @param {Object} fieldInfo 고객 전문분야 정보
   * @returns
   */
  async getCustomerField(fieldInfo) {
    try {
      const { customer_id } = fieldInfo;
      const query = CustomerFieldQuery.getCustomerField();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { customer_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[CustomerFieldService][getCustomerField] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 고객 전문분야 삭제
   * --
   * @param {Object} fieldInfo 고객 전문분야
   * @returns
   */
  async deleteCustomerField(fieldInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { customer_fields } = fieldInfo;
      let result;
      if (customer_fields) {
        const removePromise = customer_fields.map(async (item) => {
          const { customer_id, field_id } = item;
          await models.customer_field.destroy(
            { where: { customer_id, field_id } },
            { transaction }
          );
          return 1;
        });
        result = await Promise.all(removePromise);
      }
      result = await models.customer_field.destroy({ where: fieldInfo });

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(
        `[CustomerFieldService][deleteCustomerField] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
