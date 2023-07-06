import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DayPage from './DayPage';
import WeekPage from './WeekPage';
import constants from '../../utils/constants';
import axios from 'axios';
import './styles/style.css';

function StatusPage(props) {
    // Get the local date and time
    const localDate = (() => {
        const now = new Date();
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return now.toLocaleString('en-US', { timeZone: userTimeZone });
    })();

    // Function to change the status of a habit
    var changeStatus = async (habitId, statusId) => {
        try {
            const response = await axios.get(constants.UPDATE_STATUS_URL + "/" + habitId + "/" + statusId);
            return response.data.status;
        } catch (error) {
            console.error("An error occurred while updating the status." + error);
        }
    };

    // State to track the view mode (week or day)
    const [isWeekView, setIsWeekView] = useState(true);

    // Function to toggle the view mode
    const toggleView = () => {
        setIsWeekView(!isWeekView);
    };

    return (
        <div>
            {/* Navigation bar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">
                    Habit Tracker
                </a>
                <a className="nav-link text-dark" href="/">
                    Home
                </a>
            </nav>
            <div className="container mt-5">
                <nav className="navbar navbar-expand-lg">
                    <h3 id="allHabit">All Habits</h3>
                    {/* Toggle switch */}
                    <div className="toggle">
                        <input
                            type="checkbox"
                            id="toggle-switch"
                            checked={isWeekView}
                            onChange={toggleView}
                        />
                        <label className="toggle-label" htmlFor="toggle-switch"></label>
                    </div>
                    <h5>
                        {/* Label to display current view */}
                        <label id="currentView">{isWeekView ? 'Week View' : 'Day View'}</label>
                    </h5>
                </nav>
                <br />
                {/* Render WeekPage or DayPage based on the view mode */}
                {isWeekView ? (
                    <WeekPage data={localDate} changeStatus={changeStatus} setHabits={props.setHabits} allHabitsObj={props.allHabitsObj} />
                ) : (
                    <DayPage data={localDate} changeStatus={changeStatus} setHabits={props.setHabits} allHabitsObj={props.allHabitsObj} />
                )}
            </div>
        </div>
    );
}

export default StatusPage;