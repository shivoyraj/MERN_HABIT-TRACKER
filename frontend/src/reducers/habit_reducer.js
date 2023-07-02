// habitReducer.js
const initialState = { habits: [] };

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_HABITS':
      return { habits: action.payload };
    case 'ADD_HABIT':
      return { habits: [...state.habits, action.payload]};
    case 'DELETE_HABIT':
      return { habits: state.habits.filter(habit => habit._id !== action.payload)};
    default:
      return state;
  }
};

export default habitReducer;
