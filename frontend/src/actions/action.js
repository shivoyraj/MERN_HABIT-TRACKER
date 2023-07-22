
export const setHabits = (allHabitOjb) => {
    return { type: 'set', payload: allHabitOjb };
}

export const deleteHabit = (habitId) => {
    return { type: 'delete', payload: habitId };
}

export const addHabit = (habitObj) => {
    return { type: 'update', payload: habitObj };
}