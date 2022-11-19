import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Fixture from './pages/Fixture';
import { FixtureTypeLed } from './pages/Fixture/FixtureTypeLed';
import { FixtureTypeLight } from './pages/Fixture/FixtureTypeLight';
import { Home } from './pages/Home';



function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />
      <Route
        path='/fixture'
        element={<Fixture />}
      >
        <Route
          path='light'
          element={<FixtureTypeLight />}
        />
        <Route
          path='led'
          element={<FixtureTypeLed />}
        />
      </Route>
    </Routes>
  );
}

export default App;
