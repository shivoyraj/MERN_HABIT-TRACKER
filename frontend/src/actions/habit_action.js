export const setHabits = (habits) => {
  return {
    type: 'SET_HABITS',
    payload: habits
  };
};

export const addHabit = (habit) => {
  return {
    type: 'ADD_HABIT',
    payload: habit
  };
};

export const deleteHabit = (habitId) => {
  return {
    type: 'DELETE_HABIT',
    payload: habitId
  };
};

export const updateHabit = (habitId,statusId,updatedStatus) => {
  return {
    type: 'UPDATE_HABIT',
    payload: [habitId,statusId,updatedStatus]
  };
};