import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits, addHabit, deleteHabit } from '../../actions/habit_action';
import axios from 'axios';
import constants from '../../utils/constants';

function HomePage() {

    const habitNameRef = useRef("");
    const navigate = useNavigate();
    const allHabitsObj = useSelector(state => state.habits);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(constants.GET_ALL_HABITS_URL)
            .then(response => {
                dispatch(setHabits(response.data.allHabitsObj));
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const habitName = habitNameRef.current.value.trim();
        axios.post(constants.CREATE_NEW_HABIT_URL, { "title": habitName })
            .then(response => {
                console.log(response.data.habit);
                dispatch(addHabit(response.data.habit));
            })
            .catch(error => {
                console.error("got errooooooooooooooor",error);
                console.error(error.response.data.errorMessage);
            });
    }

    const handleDelete = (habitId) => {
        axios.delete(constants.DELETE_HABIT_URL + "/" + habitId)
            .then(habit => {
                dispatch(deleteHabit(habitId));
            })
            .catch(error => {
                console.error(error.response.data.errorMessage);
            });
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Habit Tracker</a>
                <a className="nav-link text-dark" onClick={() => navigate(`/status/currentWeekRecords/`)}>Track Habits</a>
            </nav>
            <div className="container mt-5">
                <h3>Add a Habit</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="habitName">Habit Name</label>
                        <input type="text" className="form-control" ref={habitNameRef} required />
                    </div>
                    <button type="submit" className="btn btn-success">Add Habit</button>
                </form>
                <hr />
                <h3>Current Habits</h3>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Habit Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allHabitsObj.map((habit) => (
                            <tr key={habit._id}>
                                <td>{habit.title}</td>
                                <td>
                                    <a onClick={() => handleDelete(habit._id)} className="btn btn-danger">Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;
