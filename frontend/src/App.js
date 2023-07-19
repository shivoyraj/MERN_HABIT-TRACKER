import HomePage from './components/homepage/HomePage';
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
          <Route path="/status" element={<StatusPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;