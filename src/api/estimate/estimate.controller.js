import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import EstimateService from './estimate.service';
let EstimateServiceInstance = Container.get(EstimateService);

export default [
  /**
   * [POST] 견적 등록
   * --
   */
  {
    path: '/estimate',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateServiceInstance.insertEstimate(
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
   * [GET] 견적 전체 목록 조회
   * --
   */
  {
    path: '/estimate/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateServiceInstance.getEstimateListAll();
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
   * [GET] 견적 상세 조회
   * --
   */
  {
    path: '/estimate/detail/:estimate_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateServiceInstance.getEstimateDetail(
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
   * [PUT] 견적 정보 수정
   * --
   */
  {
    path: '/estimate',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateServiceInstance.updateEstimate(
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
    path: '/estimate',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateServiceInstance.deleteEstimate(
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
