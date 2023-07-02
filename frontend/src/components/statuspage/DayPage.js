import React, { useState } from 'react';


function DayPage() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [allHabitsObj, setAllHabitsObj] = useState([
        { title: 'gym', record: [] },
        // Add other initial habit objects here
    ]);
  
  const today = new Date(currentDate);

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
        const entry = habit.record.find(record => record.date.toLocaleDateString() === today.toLocaleDateString());
        return (
          <div className="card-body" key={habit._id}>
            <h3 className="card-subtitle mb-2">{habit.title}</h3>
            <p className="card-text">
              <strong>Today's Record Status:</strong>
              <span
                id={`today:${habit._id},${entry?._id}`}
                // onClick={() => changeStatus(habit._id, entry?._id)}
              >
                {entry?.status === 'Done' ? '✅' : entry?.status === 'Not done' ? '❌' : '⬜'}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default DayPage;
