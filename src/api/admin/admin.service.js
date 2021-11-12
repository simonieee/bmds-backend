import moment from 'moment';
import models from '../../models';
import JWTManager from '../../utils/JWTManager';
import { logger } from '../../utils/winstonLogger';
import AdminQuery from './admin.query';
export default class AdminService {
  /**
   * 관리자 정보 등록
   * --
   * @param {Object} adminInfo 관리자 정보
   * @returns
   */
  async insertAdmin(adminInfo) {
    try {
      const result = await models.admin.create(adminInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[AdminService][insertAdmin] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 관리자 전체 조회
   * --
   * @returns
   */
  async getAdminList() {
    try {
      const query = AdminQuery.getAdminList();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[AdminService][getAdminList] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 관리자 정보 수정
   * --
   * @param {Object} adminInfo 관리자 정보
   * @returns
   */
  async updateAdmin(adminInfo) {
    try {
      const { admin_id, admin_nm, admin_pw } = adminInfo;
      const result = await models.admin.update(
        { admin_nm, admin_pw },
        { where: { admin_id } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[AdminService][updateAdmin] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 관리자 정보 삭제
   * --
   * @param {Object} adminInfo 관리자 정보
   * @returns
   */
  async deleteAdmin(adminInfo) {
    try {
      const { admin_id } = adminInfo;
      const result = await models.admin.destroy({ where: { admin_id } });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[AdminService][deleteAdmin] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 관리자 로그인
   * --
   * @param {Object} adminInfo 관리자 로그인 정보
   * @returns
   */
  async loginAdmin(adminInfo) {
    try {
      const { admin_mail, admin_pw } = adminInfo;
      const query = AdminQuery.loginAdmin();
      console.log(adminInfo);
      const [result] = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { admin_mail, admin_pw },
      });
      console.log(result);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[AdminService][loginAdmin] Error ${e.message}`);
      throw e.message;
    }
  }
}
