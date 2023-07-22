import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';

const store = configureStore({
    reducer,
    preloadedState: {
        habits: []
    }
});

export default store;
