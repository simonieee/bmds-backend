import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import AuthService from './auth.service';
let AuthServiceInstance = Container.get(AuthService);

export default [
  /**
   * [POST] 회원 로그인 요청
   * --
   */
  {
    path: '/auth/login/customer',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AuthServiceInstance.loginCustomer(req.body);
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
   * [POST] 전문가 로그인 요청
   * --
   */
  {
    path: '/auth/login/expert',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AuthServiceInstance.loginExpert(req.body);
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
   * [POST] 관리자 로그인 요청
   * --
   */
  {
    path: '/auth/login/admin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AuthServiceInstance.loginAdmin(req.body);
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
   * [POST] 통합 로그인
   * --
   */
  {
    path: '/auth/login',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AuthServiceInstance.loginTotal(req.body);
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
