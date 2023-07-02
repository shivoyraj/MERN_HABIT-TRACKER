const BACKEND_HOSTNAME = "http://localhost:8001"; 

const constants = {
    GET_ALL_HABITS_URL : BACKEND_HOSTNAME+"/habits/loadhabits",
    CREATE_NEW_HABIT_URL : BACKEND_HOSTNAME + "/habits/createHabit",
    DELETE_HABIT_URL : BACKEND_HOSTNAME +"/habits/delete",
    GET_CURRENT_WEEK_URL : BACKEND_HOSTNAME + "/status/currentWeekRecords",
    UPDATE_STATUS_URL : BACKEND_HOSTNAME + "/habits/updateStatus"
 };
 
export default constants;