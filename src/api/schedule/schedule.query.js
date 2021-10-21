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
  getDateSchedule() {
    return `
    SELECT
      schedule_id,
      expert_id,
      schedule_date
    FROM
      t_schedule
    WHERE
      expert_id = :expert_id`;
  },
  getTimeSchedule() {
    return `
    SELECT
      schedule_time
    FROM
      t_schedule
    WHERE
      expert_id = :expert_id
    AND
      schedule_date = :schedule_date;`;
  },
};
