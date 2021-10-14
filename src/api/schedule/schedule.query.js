export default {
  getScheduleList() {
    return `
    SELECT
        schedule_id,
        expert_id,
        schedule_date,
        schedule_time
    FROM
        t_schedule
    WHERE
        expert_id = :expert_id;`;
  },
};
