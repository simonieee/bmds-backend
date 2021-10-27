import moment from 'moment';
import Container from 'typedi';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ResearchCategoryService from '../research.category/research.category.service';
import ResearchQuery from './research.query';
export default class ResearchService {
  /**
   * 연구 조사 정보 등록
   * --
   * @param {Ojbect} researchInfo 연구 조사 정보
   * @returns
   */
  async insertResearch(researchInfo) {
    try {
      const { researches } = researchInfo;
      if (researches) {
        const result = await models.research.bulkCreate(researches);
        return result;
      }
      const result = await models.research.create(researchInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][insertResearch] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 정보 전체 조회
   * --
   * @returns
   */
  async getResearchListAll() {
    try {
      const query = ResearchQuery.getResearchListAll();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][getResearchList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 정보 트리형태 조회
   * --
   * @returns
   */
  async getResearchTree() {
    try {
      const ResearchCategoryServiceInstance = Container.get(
        ResearchCategoryService
      );
      const categoryList =
        await ResearchCategoryServiceInstance.getCategoryList();

      const researchListPromsie = await categoryList.map(async (item) => {
        const { category_id } = item;
        const query = ResearchQuery.getResearch();
        const result = await models.sequelize.query(query, {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: { category_id },
        });
        return { ...item, research: result };
      });

      const result = await Promise.all(researchListPromsie);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][getSearchTree] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 정보 상세 조회
   * --
   * @param {Object} researchInfo 연구 조사 정보
   * @returns
   */
  async getResearchDetail(researchInfo) {
    try {
      const { research_id } = researchInfo;
      const query = ResearchQuery.getResearch();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { research_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][getResearchDetail] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 정보 수정
   * --
   * @param {Object} researchInfo 연구 조사 정보
   * @returns
   */
  async updateResearch(researchInfo) {
    try {
      const { research_id, research_title, research_desc, category_id } =
        researchInfo;
      const result = await models.research.update(
        {
          research_title,
          research_desc,
          category_id,
          modified_at: models.sequelize.literal('UNIX_TIMESTAMP()'),
        },
        {
          where: {
            research_id,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][updateResearch] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 연구 조사 정보 삭제
   * --
   * @param {Object} researchInfo 연구 조사 정보
   * @returns
   */
  async deleteResearch(researchInfo) {
    try {
      const { research_id } = researchInfo;
      const result = await models.research.destroy({ where: { research_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][deleteResearch] Error ${e.message}`);
      throw e.message;
    }
  }
}
