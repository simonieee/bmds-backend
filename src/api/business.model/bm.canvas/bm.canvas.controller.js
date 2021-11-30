import { Container } from 'typedi';
import { UserAuthenticator } from '../../../middlewares/Authenticator';
import JWTManager from '../../../utils/JWTManager';
import BMCanvasService from './bm.canvas.service';
let BMCanvasServiceInstance = Container.get(BMCanvasService);

export default [
  /**
   * [POST] 비즈니스 모델 캔버스 정보 등록
   * --
   */
  {
    path: '/bm/canvas',
    method: 'post',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMCanvasServiceInstance.insertCanvas(req.body);
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
   * [GET] 비즈니스 모델 캔버스 정보 조회
   * --
   */
  {
    path: '/bm/canvas/:bm_id',
    method: 'get',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMCanvasServiceInstance.getCanvas(req.params);
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
   * [PUT] 비즈니스 모델 정보 수정
   * --
   */
  {
    path: '/bm/canvas',
    method: 'put',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMCanvasServiceInstance.updateCanvas(req.body);
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
   * [DELETE] 비즈니스 모델 캔버스 정보 삭제
   * --
   */
  {
    path: '/bm/canvas',
    method: 'delete',
    middleware: [UserAuthenticator],
    controller: async (req, res, next) => {
      try {
        const resultData = await BMCanvasServiceInstance.deleteCanvas(req.body);
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
