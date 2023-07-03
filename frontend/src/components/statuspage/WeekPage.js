import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../../utils/constants';
import TableCell from './TableCell';

const WeekPage = (props) => {

  const [currentMonth, setCurrentMonth] = useState(''); // Set initial month value
  const [currentYear, setCurrentYear] = useState(''); // Set initial year value
  const [currentWeekDates, setCurrentWeekDates] = useState([]); // Set initial week dates value
  const allHabitsObj = props.allHabitsObj;

  const localDate = (() => {
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return now.toLocaleString('en-US', { timeZone: userTimeZone });
  })();

  useEffect(() => {
    axios.get(constants.GET_CURRENT_WEEK_URL + "?today=" + localDate)
      .then(response => {
        props.setHabits(response.data.allHabitsObj);
        setCurrentMonth(response.data.currentMonth);
        setCurrentYear(response.data.currentYear);
        setCurrentWeekDates(response.data.currentWeekDates);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const emptyDateCount = currentWeekDates.filter(date => date === '_').length;
  const isSkipsInFirstWeek = currentWeekDates[0] === '_';

  const renderTableCell = (habit, date) => (
    <TableCell habit={habit} date={date} changeStatus={props.changeStatus} />
  );

  return (
    <div className="calendar">
      <div className="header">
        <button id="prev" onClick={() => window.location.href = '/status/previousWeekRecords'}>&lt;</button>
        <span id="month">{currentMonth} : {currentYear}</span>
        <button id="next" onClick={() => window.location.href = '/status/nextWeekRecords'}>&gt;</button>
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
            <tr>
              <th></th>
              {currentWeekDates.map(date => {
                if (date === '_') {
                  return <th key={date}>{date}</th>
                } else {
                  return <th key={date}>{new Date(date).getDate()}</th>
                }
              })}
            </tr>
          </thead>
          <tbody id="dates">
            {allHabitsObj.map(habit => (
              <tr key={habit._id}>
                <td>{habit.title}</td>
                {isSkipsInFirstWeek && Array(emptyDateCount).fill(null).map((_, index) => <td key={`empty-${index}`}></td>)}
                {currentWeekDates.map(date => renderTableCell(habit, new Date(date)))}
                {!isSkipsInFirstWeek && Array(emptyDateCount).fill(null).map((_, index) => <td key={`empty-${index}`}></td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default WeekPage;