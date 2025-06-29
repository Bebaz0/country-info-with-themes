import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryGrid from "./components/CountryGrid.jsx";
import CardDetail from "./components/CardDetail.jsx"
import  "./index.css"
import {useEffect, useState} from "react";



function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        const button = document.getElementById("themeButton")
        if (isDarkMode) {
            root.style.setProperty('--text-col', '#ffffff');
            root.style.setProperty('--background-col', '#202d36');
            root.style.setProperty('--card-background-col', '#2b3742');
            button.textContent = "Light Mode"
        } else {
            root.style.setProperty('--text-col', '#000000');
            root.style.setProperty('--background-col', '#fafafa');
            root.style.setProperty('--card-background-col', '#ffffff');
            button.textContent = "Dark Mode"
        }
    }, [isDarkMode]);

  return (
    <Router>
    <div className={"container"}>
        <header>
            <h1>Where in the world?</h1>
            <button id={"themeButton"} onClick={() => setIsDarkMode(!isDarkMode)}>Dark Mode</button>
        </header>
        <Routes>
            <Route path="/" element={<CountryGrid />} />
            <Route path="/country/:countryCode" element={<CardDetail/>} />
        </Routes>
    </div>
    </Router>
  )
}

export default App
