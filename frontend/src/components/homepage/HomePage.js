import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addHabit, deleteHabit } from '../../actions/action';

import axios from 'axios';
import constants from '../../utils/constants';
import Loading from '../../utils/Loading';

function HomePage() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const habitNameRef = useRef("");
    const dispatch = useDispatch();
    const allHabitsObj = useSelector(state => state.habits);

    useEffect(() => {
        if (allHabitsObj) {
            setIsLoading(false);
        }
    }, [allHabitsObj]);

    const onDelete = (habitId) => {
        setIsLoading(true); // Set loading state to true before making the request
        axios.delete(constants.DELETE_HABIT_URL + "/" + habitId)
            .then(response => {
                dispatch(deleteHabit(habitId))
                setIsLoading(false); // Set loading state to false when request is completed
            })
            .catch(error => {
                console.error(error.response.data.errorMessage);
                setIsLoading(false); // Set loading state to false on error
            });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const habitName = habitNameRef.current.value.trim();
        setIsLoading(true); // Set loading state to true before making the request
        axios.post(constants.CREATE_NEW_HABIT_URL, { "title": habitName })
            .then(response => {
                dispatch(addHabit(response.data.habit))
                setIsLoading(false); // Set loading state to false when request is completed
                habitNameRef.current.value = ""; // Clear the input text
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false); // Set loading state to false on error
            });
    }

    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Habit Tracker</a>
                <a className="nav-link text-dark" onClick={() => navigate(`/status`)}>Track Habits</a>
            </nav>
            {/* Main content */}
            <div className="container mt-5">
                <h3>Add a Habit</h3>
                {/* Habit form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="habitName">Habit Name</label>
                        <input type="text" className="form-control" ref={habitNameRef} disabled={isLoading} required />
                    </div>
                    <button type="submit" className="btn btn-success" disabled={isLoading}>Add Habit</button>
                </form>
                <hr />
                <h3>Current Habits</h3>
                {/* Table for displaying current habits */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Habit Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Loop over habits and display them */}
                        {isLoading ? (
                            <tr>
                                <td>
                                    <Loading />
                                </td>
                            </tr>
                        ) : (
                            allHabitsObj.map((habit) => (
                                <tr key={habit._id}>
                                    <td>{habit.title}</td>
                                    <td>
                                        {/* Delete button */}
                                        <a onClick={() => onDelete(habit._id)} className="btn btn-danger">Delete</a>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default HomePage;