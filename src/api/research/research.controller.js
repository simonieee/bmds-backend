import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ResearchService from './research.service';
let ResearchServiceInstance = Container.get(ResearchService);

export default [
  /**
   * [POST] 연구 조사 정보 등록
   * --
   */
  {
    path: '/research',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.insertResearch(
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
   * [GET] 연구 조사 정보 전체 조회
   * --
   */
  {
    path: '/research/all',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.getResearchListAll();
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
   * [GET] 연구 조사 정보 트리형태 조회
   * --
   */
  {
    path: '/research/tree',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.getResearchTree();
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
   * [GET] 연구 조사 정보 상세 조회
   * --
   */
  {
    path: '/research/detail/:research_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.getResearchDetail(
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
   * [PUT] 연구 조사 정보 수정
   * --
   */
  {
    path: '/research',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.updateResearch(
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
   * [DELETE] 연구 조사 정보 삭제
   * --
   */
  {
    path: '/research',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ResearchServiceInstance.deleteResearch(
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
