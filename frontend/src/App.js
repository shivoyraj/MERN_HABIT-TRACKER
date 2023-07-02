import React from 'react';
import HomePage from './components/homepage/HomePage';
import WeekPage from './components/statuspage/WeekPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StatusPage from './components/statuspage/StatusPage';

import { Provider } from 'react-redux'; 
import store from './store'; 

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/status" element={<WeekPage />} />
          <Route path="/status/nextWeekRecords" element={<StatusPage />} />
          <Route path="/status/currentWeekRecords" element={<StatusPage />} />
          <Route path="/status/previousWeekRecords" element={<StatusPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
