import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import FaqService from './faq.service';
let FaqServiceInstance = Container.get(FaqService);

export default [
  /**
   * [POST] FAQ 등록
   * --
   */
  {
    path: '/faq',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FaqServiceInstance.insertFaq(req.body);
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
   * [GET] FAQ 전체 조회
   * --
   */
  {
    path: '/faq',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FaqServiceInstance.getFaqList();
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
   * [PUT] FAQ 수정
   * --
   */
  {
    path: '/faq',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FaqServiceInstance.updateFaq(req.body);
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
   * [DELETE] FAQ 삭제
   * --
   */
  {
    path: '/faq',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await FaqServiceInstance.deleteFaq(req.body);
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
