import { isArray } from 'lodash';
import moment from 'moment';
import Container from 'typedi';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import NoticeQuery from './notice.query';
import NoticeFileService from '../notice.file/notice.file.service';
export default class NoticeService {
  /**
   * 공지사항 등록
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  async insertNotice(noticeInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { notice_file, noticeFiles } = noticeInfo;
      const result = await models.notice.create(noticeInfo, { transaction });

      if (notice_file && isArray(notice_file)) {
        await models.notice_file.bulkCreate(notice_file, { transaction });
      }
      await transaction.commit();
      return result;
    } catch (e) {
      await transaction.rollback();
      console.log(e);
      logger.error(`[NoticeService][insertNotice] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 정보 조회
   * --
   * @returns
   */
  async getNoticeList() {
    try {
      const query = NoticeQuery.getNoticeList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeService][getNoticeList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 정보 조회
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  async getNoticeDetail(noticeInfo) {
    try {
      const { notice_id } = noticeInfo;
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { notice_id },
      });

      const NoticeFileServiceInstance = Container.get(NoticeFileService);
      const notice_file = await NoticeFileServiceInstance.getNoticeFile(
        notice_id
      );
      return { ...result, notice_file };
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeService][getNoticeDetail] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 정보 수정
   * --
   * @param {Object} noticeInfo 공지사항 정보
   */
  async updateNotice(noticeInfo) {
    const transaction = await models.sequelize.transaction();
    try {
      const { notice_id, notice_title, notice_content } = noticeInfo;
      const result = await models.update(
        {
          notice_title,
          notice_content,
        },
        { where: { notice_id } },
        { transaction }
      );
      // 공지사항 파일 수정 내용

      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeService][updateNotice] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 조회수 증가
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  async updateHit(noticeInfo) {
    try {
      const { notice_id } = noticeInfo;
      const [{ notice_hit }] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { notice_id },
      });

      const result = await models.notice.update(
        { notice_hit: notice_hit + 1 },
        { where: { notice_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeService][updateHit] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 공지사항 정보 삭제
   * --
   * @param {Object} noticeInfo 공지사항 정보
   * @returns
   */
  async deleteNotice(noticeInfo) {
    try {
      const { notice_id } = noticeInfo;
      const result = await models.notice.destroy({ where: { notice_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[NoticeService][deleteNotice] Error ${e.message}`);
      throw e.message;
    }
  }
}
