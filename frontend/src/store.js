import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducers/reducer';
import constants from './utils/constants';
import axios from 'axios';

const fetchInitialData = async () => {
    try {
        const response = await axios.get(constants.GET_ALL_HABITS_URL);
        //console.log(response.data.allHabitsObj);
        return response.data.allHabitsObj;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const store = configureStore({
    reducer,
    preloadedState: {
        habits: await fetchInitialData(),
    },
});

export default store;
