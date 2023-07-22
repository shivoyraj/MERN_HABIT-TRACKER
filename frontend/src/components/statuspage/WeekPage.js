import React, { useEffect, useState } from 'react';
import axios from 'axios';
import constants from '../../utils/constants';
import TableCell from './TableCell';
import Loading from '../../utils/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setHabits } from '../../actions/action';


const WeekPage = (props) => {

  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [currentWeekDates, setCurrentWeekDates] = useState([]);
  const allHabitsObj = useSelector(state => state.habits);
  const dispatch = useDispatch();

  const localDate = (() => {
    const now = new Date();
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return now.toLocaleString('en-US', { timeZone: userTimeZone });
  })();

  const initializeData = (response) => {
    dispatch(setHabits(response.data.allHabitsObj));
    setCurrentMonth(response.data.currentMonth);
    setCurrentYear(response.data.currentYear);
    setCurrentWeekDates(response.data.currentWeekDates);
  };

  const loadRequestedWeekData = (url) => {
    setIsLoading(true)
    axios.get(url)
      .then(response => {
        initializeData(response);
        setIsLoading(false)
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadRequestedWeekData(constants.GET_CURRENT_WEEK_URL + "?today=" + localDate);
  }, []);

  const renderTableCell = (habit, date) => (
    <TableCell key={`${habit._id}-${date}`} habit={habit} date={date} changeStatus={props.changeStatus} />
  );

  return (
    <div>
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <div className="calendar">
          <div className="header">
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
                <tr>
                  <th></th>
                  {currentWeekDates.map(date => date === '_' ? <td>_</td> : <th key={date}>{new Date(date).getDate()}</th>)}
                </tr>
              </thead>
              <tbody id="dates">
                {allHabitsObj.map(habit => (
                  <tr key={habit._id}>
                    <td>{habit.title}</td>
                    {currentWeekDates.map(date => date === '_' ? <td key={date}></td> : renderTableCell(habit, new Date(date)))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekPage;