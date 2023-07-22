import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TableCell from './TableCell';

function DayPage(props) {

  const allHabitsObj = useSelector(state => state.habits);
  const today = new Date(props.date);

  return (
    <div className="card">
      <div className="card-body">
        {/* Display the current date */}
        <h5 className="card-title">
          {today.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </h5>
      </div>
      {/* Render habit cards */}
      {allHabitsObj.map(habit => {
        const entry = habit.record.find(record => {
          const recordDate = new Date(record.date);
          return recordDate.toLocaleDateString() === today.toLocaleDateString();
        });
        return (
          <div className="card-body" key={habit._id}>
            <h3 className="card-subtitle mb-2">{habit.title}</h3>
            <p className="card-text">
              <strong>Today's Record Status:</strong>
              {/* Render table cell component */}
              <TableCell habit={habit} date={today} changeStatus={props.changeStatus} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DayPage;