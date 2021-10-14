import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ExpertFieldService from './expert.field.service';
let ExpertFieldServiceInstance = Container.get(ExpertFieldService);

export default [
  /**
   * [POST] 전문가 분야 등록
   * --
   */
  {
    path: '/field/expert',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertFieldServiceInstance.insertExpertField(
          req.body
        );
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
   * [GET] 전문가 분야 조회
   * --
   */
  {
    path: '/field/expert/:expert_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertFieldServiceInstance.getExpertField(
          req.params
        );
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
   * [DELETE] 전문가 분야 삭제
   * --
   */
  {
    path: '/field/expert',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertFieldServiceInstance.deleteExpertField(
          req.body
        );
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
