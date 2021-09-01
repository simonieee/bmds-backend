import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
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
}
