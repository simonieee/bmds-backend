export default {
  getCanvas() {
    return `
    SELECT
        bm_id,
        bm_board,
        bm_block1,
        bm_block2,
        bm_block3
    FROM
        t_business_model_canvas
    WHERE
        bm_id = :bm_id`;
  },
};
