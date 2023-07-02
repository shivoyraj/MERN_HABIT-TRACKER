import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DayPage from './DayPage';
import WeekPage from './WeekPage';
import constants from '../../utils/constants';
import axios from 'axios';
import './styles/style.css'

function StatusPage() {

    const localDate = (() => {
        const now = new Date();
        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return now.toLocaleString('en-US', { timeZone: userTimeZone });
    })();

    var changeStatus = async (habitId, statusId) => {
        try {
            const response = await axios.get(constants.UPDATE_STATUS_URL/habitId/statusId);
            const updatedHabit = response.data;
            let updateStatusIcon;
            if (updatedHabit.status === 'Done')
                updateStatusIcon = '✅';
            else if (updatedHabit.status === 'Not done')
                updateStatusIcon = '❌';
            else
                updateStatusIcon = '⬜';
            document.getElementById(`${habitId},${statusId}`).innerHTML = updateStatusIcon;
            const element = document.getElementById(`today:${habitId},${statusId}`);
            if (element) {
                element.innerHTML = updateStatusIcon;
            }
        } catch (error) {
            console.error("An error occurred while updating the status." + error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Habit Tracker</a>
                <a className="nav-link text-dark" href="/">Home</a>
            </nav>
            <div className="container mt-5">
                <nav className="navbar navbar-expand-lg">
                    <h3 id="allHabit">All Habits</h3>
                    <div className="toggle">
                        <input type="checkbox" id="toggle-switch" />
                        <label className="toggle-label" htmlFor="toggle-switch"></label>
                    </div>
                    <h5><label id="currentView">Week View</label></h5>
                </nav>
                <br />
                <div id="dayView">
                    <DayPage data={localDate} changeStatus={changeStatus} />
                </div>
                <div id="weekView">
                    <WeekPage data={localDate} changeStatus={changeStatus} />
                </div>
            </div>
        </div>
    );
}

export default StatusPage;