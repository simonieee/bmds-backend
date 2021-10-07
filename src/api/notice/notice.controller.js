import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import NoticeService from './notice.service';
let NoticeServiceInstance = Container.get(NoticeService);

export default [
  /**
   * [POST] 공지사항 등록
   * --
   */
  {
    path: '/notice',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeServiceInstance.insertNotice(req.body);
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
   * [GET] 공지사항 전체 조회
   * --
   */
  {
    path: '/notice',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeServiceInstance.getNoticeList();
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
   * [GET] 공지사항 상세 조회
   * --
   */
  {
    path: '/notice/detail/:notice_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeServiceInstance.getNoticeDetail(
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
   * [PUT] 공지사항 정보 수정
   * --
   */
  {
    path: '/notice',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeServiceInstance.updateNotice(req.body);
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
   * [DELETE] 공지사항 정보 삭제
   * --
   */
  {
    path: '/notice',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeServiceInstance.deleteNotice(req.body);
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
