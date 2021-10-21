import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import AdminService from './admin.service';
let AdminServiceInstance = Container.get(AdminService);

export default [
  /**
   * [POST] 괸리자 정보 등록
   * --
   */
  {
    path: '/admin',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AdminServiceInstance.insertAdmin(req.body);
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
   * [GET] 관리자 정보 조회
   * --
   */
  {
    path: '/admin',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AdminServiceInstance.getAdminList();
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
   * [PUT] 관리자 정보 수정
   * --
   */
  {
    path: '/admin',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AdminServiceInstance.updateAdmin(req.body);
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
   * [DELETE] 관리자 정보 삭제
   * --
   */
  {
    path: '/admin',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await AdminServiceInstance.deleteAdmin(req.body);
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
