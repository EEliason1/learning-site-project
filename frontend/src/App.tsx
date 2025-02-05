import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import CoursePage from './pages/CoursePage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="mx-0 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/course/:id" element={<CoursePage />} />
          {/*create sign-in, sign-up, course catalog, profile*/}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
