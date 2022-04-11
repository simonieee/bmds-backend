import { Container } from 'typedi';
import { UserAuthenticator } from '../../../middlewares/Authenticator';
import JWTManager from '../../../utils/JWTManager';
import BMService from './bm.service';
let BMServiceInstance = Container.get(BMService);

export default [
  /**
   * [POST] 비즈니스 모델 생성
   * --
   */
  {
    path: '/bm',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMServiceInstance.insertBM(req.body);
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
   * [GET] 비즈니스 모델 전체 목록 조회
   * --
   */
  {
    path: '/bm/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMServiceInstance.getBMAll();
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
   * [GET] 고객별 비즈니스 모델 정보 조회
   * --
   */
  {
    path: '/bm/customer',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { authorization } = req.headers;
        const JW = new JWTManager();
        const customerInfo = await JW.decoded(authorization);

        const resultData = await BMServiceInstance.getBMByCustomer(
          customerInfo
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
   * [PUT] 비즈니스 모델 수정
   * --
   */
  {
    path: '/bm',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMServiceInstance.updateBM(req.body);
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
   * [DELETE] 비즈니스 모델 삭제
   * --
   */
  {
    path: '/bm',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const { authorization } = req.headers;
        const JW = new JWTManager();
        const customerInfo = await JW.decoded(authorization);
        const resultData = await BMServiceInstance.deleteBM({
          ...customerInfo,
          ...req.body,
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
