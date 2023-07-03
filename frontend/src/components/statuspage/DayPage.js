import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import TableCell from './TableCell';

function DayPage(props) {

  const [currentDate, setCurrentDate] = useState(props.data);
  const allHabitsObj = props.allHabitsObj;
  const today = new Date(currentDate);

  useState(() => {
    console.log(allHabitsObj);
  })

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          {new Date(currentDate).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </h5>
      </div>
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
              <TableCell habit={habit} date={today} changeStatus={props.changeStatus} />
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DayPage;
