import { useState, useEffect } from "react";
import {Routes, Route} from "react-router-dom"
import "./App.css";
import axios from "axios";

import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import EditName from "./pages/EditName";


function App() {
  return (
    <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/edit" element={<Edit/>}/>
          <Route path="/editName" element={<EditName/>}/>"
        </Routes>
    </>
  );
}

export default App;
