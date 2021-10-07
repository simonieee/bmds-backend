import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import VoucherService from './voucher.service';
let VoucherServiceInstance = Container.get(VoucherService);

export default [
  /**
   * [POST] 이용권 등록
   * --
   */
  {
    path: '/voucher',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await VoucherServiceInstance.insertVoucher(req.body);
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
   * [GET] 이용권 전체 조회
   * --
   */
  {
    path: '/voucher/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await VoucherServiceInstance.getVoucherListAll();
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
   * [GET] 사용자별 바우처 조회
   * --
   */
  {
    path: '/voucher/customer/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await VoucherServiceInstance.getVoucherListByCustomer(req.params);
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
   * [GET] 유형별 이용권 조회
   * --
   */
  {
    path: '/voucher/type/:voucher_type',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await VoucherServiceInstance.getVoucherListByVoucher(
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
   * [PUT] 이용권 사용
   * --
   */
  {
    path: '/voucher',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await VoucherServiceInstance.useVoucher(req.body);
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
   * [DELETE] 이용권 삭제
   * --
   */
  {
    path: '/voucher',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await VoucherServiceInstance.deleteVoucher(req.body);
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
