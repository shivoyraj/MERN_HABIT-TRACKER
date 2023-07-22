function reducer(state, action) {
    switch (action.type) {
        case 'set':
            return { habits: action.payload };
        case 'update':
            return { habits: [...state.habits, action.payload] };
        case 'delete':
            return { habits: state.habits.filter(habit => habit._id !== action.payload) };
        default:
            return state;
    }
}
export default reducer;