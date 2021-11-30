import moment from 'moment';
import models from '../../../models';
import JWTManager from '../../../utils/JWTManager';
import { logger } from '../../../utils/winstonLogger';
import BmCanvasQuery from './bm.canvas.query';
export default class BMCanvasService {
  /**
   * 비즈니스 모델 캔버스 정보 등록
   * --
   * @param {Object} canvasInfo 비즈니스모델 캔버스 정보
   * @returns
   */
  async insertCanvas(canvasInfo) {
    try {
      const { canvases } = canvasInfo;
      if (canvases) {
        const result = await models.bm_canvas.bulkCreate(canvases);
        return result;
      }
      const result = await models.bm_canvas.create(canvasInfo);
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMCanvasService][insertCanvas] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 비즈니스 모델 캔버스 정보 조회
   * --
   * @param {Object} canvasInfo 비즈니스 모델 캔버스 정보
   * @returns
   */
  async getCanvas(canvasInfo) {
    try {
      const { bm_id } = canvasInfo;
      const query = BmCanvasQuery.getCanvas();
      const result = await models.sequelize.query(query, {
        type: models.sequelize.QueryTypes.SELECT,
        replacements: { bm_id },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMCanvasService][getCanvas] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 비즈니스 모델 캔버스 정보 수정
   * --
   * @param {Object} canvasInfo 비즈니스 모델 캔버스 정보
   * @returns
   */
  async updateCanvas(canvasInfo) {
    try {
      const { bm_id, bm_board, bm_block1, bm_block2, bm_block3 } = canvasInfo;
      const result = await models.bm_canvas.update(
        { bm_block1, bm_block2, bm_block3 },
        { where: { bm_id, bm_board } }
      );
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMCanvasService][updateCanvas] Error ${e.message}`);
      throw e.message;
    }
  }

  /**
   * 비즈니스 모델 캔버스 정보 삭제
   * --
   * @param {Object} canvasInfo 비즈니스 모델 캔버스 정보
   * @returns
   */
  async deleteCanvas(canvasInfo) {
    try {
      const { bm_id, bm_board } = canvasInfo;
      const result = await models.bm_canvas.destroy({
        where: { bm_id, bm_board },
      });
      return result;
    } catch (e) {
      console.log(e);
      logger.error(`[BMCanvasService][deleteCanvas] Error ${e.message}`);
      throw e.message;
    }
  }
}
