import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import EstimateTypeService from './estimate.type.service';
let EstimateTypeServiceInstance = Container.get(EstimateTypeService);

export default [
  /**
   * [POST] 견적 타입 정보 등록
   * --
   */
  {
    path: '/type',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateTypeServiceInstance.insertEstimateType(
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
   * [GET] 견적 타입 정보 전체 조회
   * --
   */
  {
    path: '/type/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateTypeServiceInstance.getEstimateType();
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
   * [PUT] 견적 정보 수정
   * --
   */
  {
    path: '/type',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateTypeServiceInstance.updateEstimateType(
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
   * [DELETE] 견적 정보 삭제
   * --
   */
  {
    path: '/type',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateTypeServiceInstance.deleteEstimateType(
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
