import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import FieldService from './field.service';
let FieldServiceInstance = Container.get(FieldService);

export default [
  /**
   * [POST] 전문분야 등록
   * --
   */
  {
    path: '/field',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FieldServiceInstance.insertField(req.body);
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

  /**
   * [GET] 전문분야 조회
   * --
   */
  {
    path: '/field',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FieldServiceInstance.getFieldList();
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
