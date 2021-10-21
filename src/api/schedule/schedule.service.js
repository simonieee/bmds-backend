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
      const query = ScheduleQuery.getScheduleList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { expert_id },
      });
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
