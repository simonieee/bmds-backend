import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
export default class ResearchService {
  async insertResearch(researchInfo) {
    try {
    } catch (e) {
      console.log(e);
      logger.error(`[ResearchService][insertResearch] Error ${e.message}`);
      throw e.message;
    }
  }
}
