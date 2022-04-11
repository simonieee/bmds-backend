import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import NoticeFileService from './notice.file.service';
let NoticeFileServiceInstance = Container.get(NoticeFileService);

export default [
  /**
   * [POST] 공지사항 파일 등록
   * --
   */
  {
    path: '/notice/file',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeFileServiceInstance.insertNoticeFile(
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
   * [GET] 공지사항 파일 정보 조회
   * --
   */
  {
    path: '/notice/file/:notice_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeFileServiceInstance.getNoticeFile(
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
   * [PUT] 공지사항 파일 정보 수정
   * --
   */
  {
    path: '/notice/file',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeFileServiceInstance.updateNoticeFile(
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
   * [DELETE] 공지사항 파일 정보 삭제
   * --
   */
  {
    path: '/notice/file',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await NoticeFileServiceInstance.deleteNoticeFile(
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
