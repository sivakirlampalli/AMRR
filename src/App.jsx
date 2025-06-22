import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ViewItems from './pages/ViewItems';
import './App.css'; // Import custom CSS for styling

function App() {
  return (
    <Router>
      <header className="navbar">
        <NavLink exact="true" to="/" className="navLink" activeclassname="activeLink">
          View Items
        </NavLink>
        <NavLink to="/add" className="navLink" activeclassname="activeLink">
          Add Item
        </NavLink>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ViewItems />} />
          <Route path="/add" element={<AddItem />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
