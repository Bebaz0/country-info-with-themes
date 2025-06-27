import {useEffect, useState} from 'react'
import './App.css'
import Searchbar from "./components/searchbar.jsx";
import Filter from "./components/filter.jsx";
import Card from "./components/card.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryGrid from "./components/CountryGrid.jsx";
import CardDetail from "components/CardDetail.jsx"



function App() {
  return (
    <Router>
    <div className={"container"}>
        <header>
            <h1>Where in the world?</h1>
            <button>Dark Mode</button>
        </header>
        <Routes>
            <Route path="/" element={<CountryGrid />} />
            <Route path="/country/:countryCode" element={<CardDetail />} />
        </Routes>
    </div>
    </Router>
  )
}

export default App
