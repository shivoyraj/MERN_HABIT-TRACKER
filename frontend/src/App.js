import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/homepage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StatusPage from './components/statuspage/StatusPage';
import axios from 'axios';
import constants from './utils/constants';

function App() {
  const habitNameRef = useRef("");
  const [allHabitsObj, setAllHabitsObj] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    axios.get(constants.GET_ALL_HABITS_URL)
      .then(response => {
        onSetHabits(response.data.allHabitsObj);
        setIsLoading(false); // Set loading state to false when request is completed
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false); // Set loading state to false on error
      });
  }, []);

  const onSetHabits = (habitOjb) => {
    setAllHabitsObj(habitOjb);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const habitName = habitNameRef.current.value.trim();
    setIsLoading(true); // Set loading state to true before making the request
    axios.post(constants.CREATE_NEW_HABIT_URL, { "title": habitName })
      .then(response => {
        setAllHabitsObj([...allHabitsObj, response.data.habit])
        setIsLoading(false); // Set loading state to false when request is completed
      })
      .catch(error => {
        console.error(error.response.data.errorMessage);
        setIsLoading(false); // Set loading state to false on error
      });
  }

  const onDelete = (habitId) => {
    setIsLoading(true); // Set loading state to true before making the request
    axios.delete(constants.DELETE_HABIT_URL + "/" + habitId)
      .then(habit => {
        setAllHabitsObj(allHabitsObj.filter(habit => habit._id !== habitId))
        setIsLoading(false); // Set loading state to false when request is completed
      })
      .catch(error => {
        console.error(error.response.data.errorMessage);
        setIsLoading(false); // Set loading state to false on error
      });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              allHabitsObj={allHabitsObj}
              handleDelete={onDelete}
              handleSubmit={onSubmit}
              habitNameRef={habitNameRef}
              isLoading={isLoading} // Pass the loading state as a prop
            />
          }
        />
        <Route
          path="/status"
          element={<StatusPage allHabitsObj={allHabitsObj} setHabits={onSetHabits} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;