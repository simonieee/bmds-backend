import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ResearchCategoryService from './research.category.service';
let ResearchCategoryServiceInstance = Container.get(ResearchCategoryService);

export default [
  /**
   * [POST] 조사 카테고리 등록
   * --
   */
  {
    path: '/category',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchCategoryServiceInstance.insertCategory(
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
   * [GET] 조사 카테고리 조회
   * --
   */
  {
    path: '/category',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData =
          await ResearchCategoryServiceInstance.getCategoryList();
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
   * [PUT] 조사 카테고리 수정
   * --
   */
  {
    path: '/category',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchCategoryServiceInstance.updateCategory(
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
   * [DELETE] 카테고리 정보 삭제
   * --
   */
  {
    path: '/category',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchCategoryServiceInstance.deleteCategory(
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
