import React from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DayPage from './DayPage';
import WeekPage from './WeekPage';
import constants from '../../utils/constants';
import axios from 'axios';
import './styles/style.css'

function StatusPage(props) {

    const localDate = (() => {
        const now = new Date();
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return now.toLocaleString('en-US', { timeZone: userTimeZone });
    })();

    var changeStatus = async (habitId, statusId) => {
        try {
            const response = await axios.get(constants.UPDATE_STATUS_URL + "/" + habitId + "/" + statusId);
            return response.data.status;
        } catch (error) {
            console.error("An error occurred while updating the status." + error);
        }
    };

    const [isWeekView, setIsWeekView] = useState(true);

    const toggleView = () => {
        setIsWeekView(!isWeekView);
    };

    return (
        <div>
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
                        <label id="currentView">{isWeekView ? 'Week View' : 'Day View'}</label>
                    </h5>
                </nav>
                <br />
                {isWeekView ? (
                    <WeekPage data={localDate} changeStatus={changeStatus} setHabits = {props.setHabits} allHabitsObj = {props.allHabitsObj}/>
                ) : (
                    <DayPage data={localDate} changeStatus={changeStatus} setHabits = {props.setHabits} allHabitsObj = {props.allHabitsObj} />
                )}
            </div>
        </div>
    );

}

export default StatusPage;