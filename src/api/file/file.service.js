import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
export default class FileService {
  async uploadFile(fileInfo) {
    try {
      return true;
    } catch (e) {
      console.log(e);
      logger.error(`[FileService] [uploadFile] Error ${e.message}`);
      throw e.message;
    }
  }
}
