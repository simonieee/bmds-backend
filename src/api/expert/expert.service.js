import moment from 'moment';
import Container from 'typedi';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ExpertFieldService from '../expert.field/expert.field.service';
import ExpertQuery from './expert.query';

export default class ExpertService {
  /**
   * 전문가 로그인 요청
   * --
   * @param {Object} expertInfo 전문가 로그인 정보
   * @returns
   */
  async loginExpert(expertInfo) {
    try {
      const { email, password } = expertInfo;
      const query = ExpertQuery.loginExpert();
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
      logger.error(`[ExpertService][loginExpert] Error ${e.message}`);
      throw e;
    }
  }

  /**
   * 전문가 정보 등록
   * --
   * @param {Object} expertInfo 전문가 정보
   * @returns
   */
  async insertExpert(expertInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { expert_field } = expertInfo;
      const expert = await models.expert.create(expertInfo, { transaction });

      let expert_fields;
      if (expert_field) {
        const { expert_id } = expert;
        const expertFieldTemp = expert_field.map((item) => {
          return { ...item, expert_id };
        });
        expert_fields = await models.expert_field.bulkCreate(expertFieldTemp, {
          transaction,
        });
      }
      await transaction.commit();
      return { ...expert, expert_field: expert_fields };
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[ExpertService][insertExpert] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 정보 전체 조회
   * --
   * @returns
   */
  async getExpertList() {
    try {
      const expertListQuery = ExpertQuery.getExpertList();
      const expert = await models.sequelize.query(expertListQuery, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      const ExpertFieldServiceInstance = Container.get(ExpertFieldService);
      const expertPromise = expert.map(async (item) => {
        const { expert_id } = item;
        const expert_field = await ExpertFieldServiceInstance.getExpertField({
          expert_id,
        });
        return {
          ...item,
          expert_grade: (Math.random() * 3 + 2).toFixed(1),
          expert_field,
        };
      });
      const result = await Promise.all(expertPromise);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ExpertService][getExpertList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 상세 조회
   * --
   * @param {Object} expertInfo 전문가 정보
   * @returns
   */
  async getExpertDetail(expertInfo) {
    try {
      const { expert_id } = expertInfo;
      const expertQuery = ExpertQuery.getExpert();
      const [expert] = await models.sequelize.query(expertQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { expert_id },
      });
      const ExpertFieldServiceInstance = Container.get(ExpertFieldService);

      const expert_field = await ExpertFieldServiceInstance.getExpertField({
        expert_id,
      });

      return { ...expert, expert_field };
    } catch (e) {
      console.log(e);
      logger.error(`[ExpertService][getExpertDetail] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 정보 수정
   * --
   * @param {Object} expertInfo 전문가 정보
   * @returns
   */
  async updateExpert(expertInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const {
        expert_id,
        expert_nm,
        expert_pw,
        expert_tel,
        expert_company,
        expert_img,
        expert_resume,
        expert_field,
        expert_introduce,
      } = expertInfo;
      const result = await models.expert.update(
        {
          expert_nm,
          expert_pw,
          expert_tel,
          expert_company,
          expert_img,
          expert_resume,
          expert_introduce,
        },
        {
          where: {
            expert_id,
          },
        },
        { transaction }
      );

      if (expert_field) {
        const addField = expert_field
          .filter((item) => item.add)
          .map((item) => {
            return { ...item, expert_id };
          });
        await models.expert_field.bulkCreate(addField, { transaction });

        const removeField = expert_field
          .filter((item) => item.remove)
          .map((item) => item.field_id);
        await models.expert_field.destroy(
          { where: { expert_id, field_id: removeField } },
          { transaction }
        );
      }

      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[ExpertService][updateExpert] Error ${e.message}`);
      throw e.message;
    }
  }
  /**
   * 전문가 정보 삭제
   * --
   * @param {Object} expertInfo 전문가 정보
   */
  async deleteExpert(expertInfo) {
    try {
      const { expert_id } = expertInfo;
      const result = await models.expert.destroy({ where: { expert_id } });
    } catch (e) {
      console.log(e);
      logger.error(`[ExpertService][deleteExpert] Error ${e.message}`);
      throw e.message;
    }
  }
}
