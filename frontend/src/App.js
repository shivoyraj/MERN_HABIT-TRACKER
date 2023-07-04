import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/homepage/HomePage';
import WeekPage from './components/statuspage/WeekPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StatusPage from './components/statuspage/StatusPage';
import axios from 'axios';
import constants from './utils/constants';

function App() {

  const habitNameRef = useRef(""); // Move the definition of habitNameRef here
  const [allHabitsObj, setAllHabitsObj] = useState([]);

  useEffect(() => {
    axios.get(constants.GET_ALL_HABITS_URL)
      .then(response => {
        console.log(response.data.allHabitsObj);
        onSetHabits(response.data.allHabitsObj);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onSetHabits = (habitOjb) => {
    setAllHabitsObj(habitOjb);
  }

  useEffect(() => {
  }, [allHabitsObj]);

  const onSubmit = (event) => {
    event.preventDefault();
    const habitName = habitNameRef.current.value.trim();
    axios.post(constants.CREATE_NEW_HABIT_URL, { "title": habitName })
      .then(response => {
        console.log(response.data.habit);
        setAllHabitsObj([...allHabitsObj, response.data.habit])
      })
      .catch(error => {
        console.error(error.response.data.errorMessage);
      });
  }

  const onDelete = (habitId) => {
    axios.delete(constants.DELETE_HABIT_URL + "/" + habitId)
      .then(habit => {
        setAllHabitsObj(allHabitsObj.filter(habit => habit._id !== habitId))
      })
      .catch(error => {
        console.error(error.response.data.errorMessage);
      });
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage allHabitsObj={allHabitsObj} handleDelete={onDelete} handleSubmit={onSubmit} habitNameRef={habitNameRef} />} />
        <Route path="/status" element={<StatusPage allHabitsObj={allHabitsObj} setHabits={onSetHabits} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
