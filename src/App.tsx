import React from 'react';
import logo from './logo.svg';
import './App.css';
import Kanbas from "./Kanbas";
import Labs from "./Labs";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
export default function App() {
  return (
      <HashRouter>
          <div>
              <Routes>
                  <Route path="/" element={<Navigate to="Labs" />} />
                  <Route path="/Labs/*" element={<Labs />} />
                  <Route path="/Kanbas/*" element={<Kanbas />} />
              </Routes>
          </div>
      </HashRouter>
  );
}


//export default App;
