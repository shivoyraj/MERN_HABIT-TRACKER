// habitReducer.js
const initialState = { habits: [] };

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HABITS':
      return { habits: action.payload };
    case 'ADD_HABIT':
      return { habits: [...state.habits, action.payload] };
    case 'DELETE_HABIT':
      return { habits: state.habits.filter(habit => habit._id !== action.payload) };
    case 'UPDATE_HABIT':
      const [habitId, statusId, updatedStatus] = action.payload;
      const updatedHabits = state.habits.map(habit => {
        if (habit._id === habitId) {
          const updatedRecord = habit.record.map(record => {
            if (record._id === statusId) {
              return { ...record, status: updatedStatus };
            }
            return record;
          });
          return { ...habit, record: updatedRecord };
        }
        return habit;
      });
      return { habits: updatedHabits };
    default:
      return state;
  }
};

export default habitReducer;
