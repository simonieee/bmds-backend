import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import S3Manager from '../../utils/S3Manager';
import { logger } from '../../utils/winstonLogger';
export default class FileService {
  async uploadFile(fileInfo) {
    try {
      const { files, dirInfo } = fileInfo;
      const { dir_nm } = dirInfo;
      const S3 = new S3Manager();
      const result = await S3._multiUpload(dir_nm, files);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[FileService] [uploadFile] Error ${e.message}`);
      throw e.message;
    }
  }
}
