import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import NoticeFileQuery from './notice.file.query';
export default class NoticeFileService {
  /**
   * 공지사항 파일 등록
   * --
   * @param {Object} noticeFileInfo 공지사항 파일 정보
   * @returns
   */
  async insertNoticeFile(noticeFileInfo) {
    try {
      const { noticeFiles } = noticeFileInfo;
      if (noticeFiles) {
        const result = await models.notice_file.bulkCreate(noticeFiles);
        return result;
      }
      const result = await models.notice_file.create(noticeFileInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeFileService][insertNoticeFile] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 파일 조회
   * --
   * @param {Object} noticeFileInfo 공지사항 파일 정보
   * @returns
   */
  async getNoticeFile(noticeFileInfo) {
    try {
      const { notice_id } = noticeFileInfo;
      const query = NoticeFileQuery.getNoticeFile();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { notice_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeFileService][getNoticeFile] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 파일 정보 수정
   * --
   * @param {Object} noticeFileInfo 공지사항 파일 정보
   * @returns
   */
  async updateNoticeFile(noticeFileInfo) {
    try {
      const { file_id, file_nm, file_url } = noticeFileInfo;
      const result = await models.notice_file.update(
        {
          file_nm,
          file_url,
        },
        { where: { file_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeFileService][updateNoticeFile] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 파일 정보 삭제
   * --
   * @param {Object} noticeFileInfo 공지사항 파일 정보
   * @returns
   */
  async deleteNoticeFile(noticeFileInfo) {
    try {
      const { file_id } = noticeFileInfo;
      const result = await models.notice_file.destroy({ where: { file_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeFileService][deleteNoticeFile] Error ${e.message}`);
      throw e.message;
    }
  }
}
