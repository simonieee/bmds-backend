import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import EstimateItem from './estimate.item.service';
let EstimateItemInstance = Container.get(EstimateItem);

export default [
  /**
   * [POST] 견적 상품 정보 등록
   * --
   */
  {
    path: '/estimate/item',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateItemInstance.insertEstimateItem(
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
   * [GET] 견적 상품 정보 조회
   * --
   */
  {
    path: '/estimate/item/:estimate_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateItemInstance.getEstimateItem(
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
   * [GET] 연구 조사별 견적 상품 정보 조회
   * --
   */
  {
    path: '/estimate/item/:estimate_id/:research_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateItemInstance.getEstimateItemByResearch(
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
   * [PUT] 견적 상품 정보 수정
   * --
   */
  {
    path: '/estimate/item',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateItemInstance.updateEstimateItem(
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
   * [DELETE] 견적 상품 정보 삭제
   * --
   */
  {
    path: '/estimate/item',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await EstimateItemInstance.deleteEstimateItem(
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
