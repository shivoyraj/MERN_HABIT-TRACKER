import { createStore } from 'redux';
import rootReducer from './reducers/habit_reducer';

const store = createStore(rootReducer);

export default store;