import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ResearchCategoryQuery from './research.category.query';
export default class ResearchCategoryService {
  /**
   * 조사 카테고리 등록
   * --
   * @param {Object} categoryInfo 카테고리 정보
   * @returns
   */
  async insertCategory(categoryInfo) {
    try {
      const { categories } = categoryInfo;
      if (categories) {
        const result = await models.research_category.bulkCreate(categories);
        return result;
      }
      const result = await models.research_category.create(categoryInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ResearchCategoryService][insertCategory] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 카테고리 목록 조회
   * --
   * @returns
   */
  async getCategoryList() {
    try {
      const query = ResearchCategoryQuery.getCategoryList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ResearchCategoryService][getCategoryList] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 조사 카테고리 정보 수정
   * --
   * @param {Object} categoryInfo 카테고리 정보
   * @returns
   */
  async updateCategory(categoryInfo) {
    try {
      const { category_id, category_nm, category_desc } = categoryInfo;
      const result = await models.research_category.update(
        {
          category_nm,
          category_desc,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        {
          where: {
            category_id,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ResearchCategoryService][updateCategory] Error ${e.message}`
      );
      throw e.message;
    }
  }

  /**
   * 카테고리 정보 삭제
   * --
   * @param {Object} categoryInfo 카테고리 정보
   * @returns
   */
  async deleteCategory(categoryInfo) {
    try {
      const { category_id } = categoryInfo;
      const result = await models.research_category.destroy({
        where: { category_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(
        `[ResearchCategoryService][deleteCategory] Error ${e.message}`
      );
      throw e.message;
    }
  }
}
