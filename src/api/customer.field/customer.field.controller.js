import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import CustomerFieldService from './customer.field.service';
let CustomerFieldServiceInstance = Container.get(CustomerFieldService);

export default [
  /**
   * [POST] 고객 전문분야 등록
   * --
   */
  {
    path: '/field/customer',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CustomerFieldServiceInstance.insertCustomerField(req.body);
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
   * [GET] 고객 전문분야 조회
   * --
   */
  {
    path: '/field/customer/:customer_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await CustomerFieldServiceInstance.getCustomerField(
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
   * [DELETE] 고객 전문분야 삭제
   * --
   */
  {
    path: '/filed/customer',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await CustomerFieldServiceInstance.deleteCustomerField(req.body);
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
