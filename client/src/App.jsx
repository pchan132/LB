import { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import "./App.css";
import axios from "axios";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Edit from "./pages/Edit";


function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit" element={<Edit/>}/>
        </Routes>
    </>
  );
}

export default App;
