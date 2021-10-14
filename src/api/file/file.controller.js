import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import FileService from './file.service';
let FileServiceInstance = Container.get(FileService);

export default [
  /**
   * [POST] 파일 업로드
   * --
   */
  {
    path: '/file',
    method: 'post',
    middleware: [],
    file: 'multiple',
    controller: async (req, res, next) => {
      try {
        const resultData = await FileServiceInstance.uploadFile({
          files: req.files,
          dirInfo: req.body.dirInfo,
        });
        return res.status(200).json({
          status: 200,
          message: 'success',
          data: resultData,
        });
      } catch (error) {
        return res.status(500).json({
          status: 500,
          message: 'failed',
          data: error,
        });
      }
    },
  },
];
