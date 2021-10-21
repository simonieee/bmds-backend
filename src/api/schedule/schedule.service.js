import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import ScheduleQuery from './schedule.query';
export default class ScheduleService {
  /**
   * 전문가 스케쥴 등록
   * --
   * @param {Object} scheduleInfo 스케쥴 정보
   * @returns
   */
  async insertSchedule(scheduleInfo) {
    try {
      const { schedules } = scheduleInfo;
      if (schedules) {
        const result = await models.schedule.bulkCreate(schedules);
        return result;
      }
      const result = await models.schedule.create(scheduleInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ScheduleService][insertSchedule] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 스케쥴 조회
   * --
   * @param {Object} scheduleInfo 스케쥴 정보
   */
  async getScheduleList(scheduleInfo) {
    try {
      const { expert_id } = scheduleInfo;
      // 전문가 예약 일자 조회
      const dateQuery = ScheduleQuery.getDateSchedule();
      const date_list = await models.sequelize.query(dateQuery, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { expert_id },
      });

      // 전문가 예약 일자별 시간 조회
      const schedulePromise = date_list.map(async (item) => {
        const { schedule_date } = item;
        const timeQuery = ScheduleQuery.getTimeSchedule();
        const schedule_time = await models.sequelize.query(timeQuery, {
          type: models.sequelize.QueryTypes.SELECT,
          replacements: { expert_id, schedule_date, reservation_yn: true },
        });
        return { ...item, schedule_times: schedule_time };
      });
      const result = await Promise.all(schedulePromise);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ScheduleService][getScheduleList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 스케쥴 정보 수정
   * @param {Object} scheduleInfo 스케쥴 정보
   */
  async updateSchedule(scheduleInfo) {
    try {
      const { schedule_id, schedule_date, schedule_time } = scheduleInfo;
      const result = await models.schedule.update(
        { schedule_date, schedule_time },
        { where: { schedule_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ScheduleService][updateSchedule] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 전문가 스케쥴 정보 삭제
   * --
   * @param {Object} scheduleInfo 스케쥴 정보
   */
  async deleteSchedule(scheduleInfo) {
    try {
      const { schedule_id } = scheduleInfo;
      const result = await models.schedule.destroy({ where: { schedule_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[ScheduleService][deleteSchedule] Error ${e.message}`);
      throw e.message;
    }
  }
}
