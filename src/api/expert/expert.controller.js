import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import MailValidator from '../../middlewares/MailValidator';
import JWTManager from '../../utils/JWTManager';
import ExpertService from './expert.service';
let ExpertServiceInstance = Container.get(ExpertService);

export default [
  /**
   * [POST] 전문가 등록
   * --
   */
  {
    path: '/expert',
    method: 'post',
    middleware: [MailValidator],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertServiceInstance.insertExpert(req.body);
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
   * [GET] 전문가 전체 조회
   * --
   */
  {
    path: '/expert',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertServiceInstance.getExpertList();
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
   * [GET] 전문가 상세 조회
   * --
   */
  {
    path: '/expert/detail/:expert_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertServiceInstance.getExpertDetail(
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
   * [PUT] 전문가 수정
   * --
   */
  {
    path: '/expert',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertServiceInstance.updateExpert(req.body);
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
   * [DELETE] 전문가 삭제
   * --
   */
  {
    path: '/expert',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ExpertServiceInstance.deleteExpert(req.body);
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
