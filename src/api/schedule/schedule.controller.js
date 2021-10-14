import { Container } from 'typedi';
import { UserAuthenticator } from '../../middlewares/Authenticator';
import JWTManager from '../../utils/JWTManager';
import ScheduleService from './schedule.service';
let ScheduleServiceInstance = Container.get(ScheduleService);

export default [
  /**
   * [POST] 전문가 일정 등록
   * --
   */
  {
    path: '/schedule',
    method: 'post',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ScheduleServiceInstance.insertSchedule(
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
   * [GET] 전문가 스케쥴 조회
   * --
   */
  {
    path: '/schedule/:expert_id',
    method: 'get',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ScheduleServiceInstance.getScheduleList(
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
   * [PUT] 전문가 스케쥴 수정
   * --
   */
  {
    path: '/schedule',
    method: 'put',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ScheduleServiceInstance.updateSchedule(
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
   * [DELETE] 전문가 스케쥴 삭제
   * --
   */
  {
    path: '/schedule',
    method: 'delete',
    middleware: [],
    controller: async (req, res, next) => {
      try {
        const resultData = await ScheduleServiceInstance.deleteSchedule(
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
