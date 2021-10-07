import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import FaqQuery from './faq.query';
export default class FaqService {
  /**
   * FAQ 등록
   * --
   * @param {Object} faqInfo FAQ 정보
   * @returns
   */
  async insertFaq(faqInfo) {
    try {
      const { faqs } = faqInfo;
      if (faqs) {
        const result = await models.faq.bulkCreate(faqs);
        return result;
      }
      const result = await models.faq.create(faqInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FaqService][insertFaq] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * FAQ 목록
   * --
   * @returns
   */
  async getFaqList() {
    try {
      const query = FaqQuery.getFaqList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FaqService][getFaqList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * FAQ 수정
   * --
   * @param {Object} faqInfo FAQ 정보
   * @returns
   */
  async updateFaq(faqInfo) {
    try {
      const { faq_id, faq_title, faq_desc, faq_type } = faqInfo;
      const result = await models.faq.update(
        {
          faq_title,
          faq_desc,
          faq_type,
        },
        { where: { faq_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FaqService][updateFaq] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * FAQ 삭제
   * --
   * @param {Object} faqInfo FAQ 정보
   * @returns
   */
  async deleteFaq(faqInfo) {
    try {
      const { faq_id } = faqInfo;
      const result = await models.faq.destroy({ where: { faq_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FaqService][deleteFaq] Error ${e.message}`);
      throw e.message;
    }
  }
}
