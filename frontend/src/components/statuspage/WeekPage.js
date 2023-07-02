import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setHabits } from '../../actions/habit_action';
import axios from 'axios';
import constants from '../../utils/constants';

const WeekPage = (props) => {

  const [currentMonth, setCurrentMonth] = useState(''); // Set initial month value
  const [currentYear, setCurrentYear] = useState(''); // Set initial year value
  const [currentWeekDates, setCurrentWeekDates] = useState([]); // Set initial week dates value
  const allHabitsObj = useSelector(state => state.habits);
  const dispatch = useDispatch();

  const localDate = (() => {
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return now.toLocaleString('en-US', { timeZone: userTimeZone });
  })();

  useEffect(() => {
    axios.get(constants.GET_CURRENT_WEEK_URL + "?today=" + localDate)
      .then(response => {
        dispatch(setHabits(response.data.allHabitsObj));
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

  // Helper function to get the entry for a habit on a specific date
  const getEntryForDate = (habit, date) => {
    const entry = habit.record.find(record => new Date(record.date).toDateString() === date.toDateString());
    return entry || null;
  }

  // Helper function to render a table cell for a habit on a specific date
  const renderTableCell = (habit, date) => {
    const entry = getEntryForDate(habit, date);
    return (
      <td key={`${habit._id}-${date}`}>
        <span id={`${habit._id},${entry?._id}`} onClick={() => props.changeStatus(habit._id,entry?._id)}>
          {entry?.status === 'Done' ? '✅' : entry?.status === 'Not done' ? '❌' : '⬜'}
        </span>
      </td>
    )
  }

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
