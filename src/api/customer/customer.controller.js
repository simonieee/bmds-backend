import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import CustomerService from './customer.service';
let CustomerServiceInstance = Container.get(CustomerService);

export default [
  /**
   * [POST] 고객 정보 등록 컨트롤러
   * --
   */
  {
    path: '/customer',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.insertCustomer(
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
   * [GET] 고객 전체 목록 조회
   * --
   */
  {
    path: '/customer/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerListAll();
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
   * [GET] 고객 상세정보 조회 컨트롤러
   * --
   */
  {
    path: '/customer/detail/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerServiceInstance.getCustomerDetail(
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
];
