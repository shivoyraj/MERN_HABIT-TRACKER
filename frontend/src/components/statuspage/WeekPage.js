import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../../utils/constants';
import TableCell from './TableCell';

const WeekPage = (props) => {
  // Set initial values for current month, current year, and current week dates
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const allHabitsObj = props.allHabitsObj;

  const localDate = (() => {
    // Get the local date and time
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return now.toLocaleString('en-US', { timeZone: userTimeZone });
  })();

  const initializeData = (response) => {
    // Initialize data based on the response
    props.setHabits(response.data.allHabitsObj);
    setCurrentMonth(response.data.currentMonth);
    setCurrentYear(response.data.currentYear);
    setCurrentWeekDates(response.data.currentWeekDates);
  }

  const loadRequestedWeekData = (url) => {
    // Load data for the requested week
    axios.get(url)
      .then(response => {
        initializeData(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const [emptyDateCount, setEmptyDateCount] = useState(0);
  const [isSkipsInFirstWeek, setIsSkipInFirstWeek] = useState(false);

  useEffect(() => {
    // Update empty date count and check if there are skips in the first week
    setEmptyDateCount(currentWeekDates.filter(date => date === '_').length);
    setIsSkipInFirstWeek(currentWeekDates[0] === '_');
    console.log(currentWeekDates);
  }, [currentWeekDates]);

  useEffect(() => {
    // Load data for the current week on component mount
    loadRequestedWeekData(constants.GET_CURRENT_WEEK_URL + "?today=" + localDate);
    console.log();
  }, []);

  const renderTableCell = (habit, date) => (
    // Render a table cell component for each habit and date
    <TableCell habit={habit} date={date} changeStatus={props.changeStatus} />
  );

  return (
    <div className="calendar">
      <div className="header">
        {/* Buttons to navigate to previous and next weeks */}
        <button id="prev" onClick={() => loadRequestedWeekData(constants.GET_PREV_WEEK_URL)}>&lt;</button>
        <span id="month">{currentMonth} : {currentYear}</span>
        <button id="next" onClick={() => loadRequestedWeekData(constants.GET_NEXT_WEEK_URL)}>&gt;</button>
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>Name of Habit</th>
              <th>Sun</th>
              <th>Mon</th>
              <th>Tue</th>
              <th>Wed</th>
              <th>Thu</th>
              <th>Fri</th>
              <th>Sat</th>
            </tr>
            {/* Render the week dates */}
            <tr>
              <th></th>
              {currentWeekDates.map(date => date === '_' ? <td>_</td> : <th>{new Date(date).getDate()}</th>)}
            </tr>
          </thead>
          <tbody id="dates">
            {/* Render habit rows */}
            {allHabitsObj.map(habit => (
              <tr key={habit._id}>
                <td>{habit.title}</td>
                {currentWeekDates.map(date => date === '_' ? <td></td> : renderTableCell(habit, new Date(date)))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WeekPage;