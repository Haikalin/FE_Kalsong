import React from "react";
import "../tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TabelLagu from "./tabelLagu.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabelArtis from "./tabelArtis.jsx";
import Pagination from "./pagination.jsx";
import Footer from "./footer.jsx";

const Change_Time = () => {
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);
    const firstIndex = currentPage * songsPerPage - songsPerPage;
    const lastIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(firstIndex, lastIndex);

    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const changeBgPage = (idpage) => {
        const pageButton = [
            document.getElementById("buttonpage1"),
            document.getElementById("buttonpage2"),
            document.getElementById("buttonpage3"),
            document.getElementById("buttonpage4"),
            document.getElementById("buttonpage5"),            
        ]
        pageButton.forEach((button) => {
            if (button.id === idpage) {
                button.classList.remove("bg-spotify-black")
                button.classList.add("bg-spotify-green")
            }
            else {
                button.classList.remove("bg-spotify-green")
                button.classList.add("bg-spotify-black")
            }
        })
    }

    useEffect(() => {
        const page1 = document.getElementById("buttonpage1")
        page1.classList.remove("bg-spotify-black")
        page1.classList.add("bg-spotify-green")
    }, []);

    useEffect(() => {
        const fetch1month = async () => {
          let result = await axios.get("http://localhost:5050/onemonth")
          console.log(result.data)
          setSongs(result.data)
        }
        fetch1month()
        }, []);
    
    useEffect(() => {
        const one_month = document.getElementById("button1")
        one_month.classList.remove("bg-spotify-black")
        one_month.classList.add("bg-spotify-green")
    }, []);
    


      const add_bgreen = (id) => {
        const button = [
            document.getElementById("button1"),
            document.getElementById("button2"),
            document.getElementById("button3"),
            document.getElementById("button4")
        ]
        button.forEach((element) => {
            if (element.id === id) {
                element.classList.remove("bg-spotify-black")
                element.classList.add("bg-spotify-green")
            }
            else {
                element.classList.remove("bg-spotify-green")
                element.classList.add("bg-spotify-black")
            }
        })
    }
    
    const handleClik = async () => {
        let result = await axios.get("http://localhost:5050/onemonth")
        result = result.data
        add_bgreen("button1")
        setSongs(result)
    }
    
    const handleClik2 = async () => {
        let result = await axios.get("http://localhost:5050/sixmonth")
        result = result.data
        add_bgreen("button2")
        setSongs(result)
    }
    
    const handleClik3 = async () => {
        let result = await axios.get("http://localhost:5050/oneyear")
        result = result.data
        add_bgreen("button3")
        setSongs(result)
    }
    
    const handleClik4 = async () => {
        let result = await axios.get("http://localhost:5050/alltime")
        result = result.data
        add_bgreen("button4")
        setSongs(result)
    }
    return (
        <>
        <Router>
            <div id="kumpulan_button" className="flex justify-center">
                <button id="button1" onClick={handleClik} class="bg-spotify-black text-white p-2 rounded-lg mx-2">1 month</button>
                <button id="button2" onClick={handleClik2} class="bg-spotify-black text-white p-2 rounded-lg mx-2">6 months</button>
                <button id="button3" onClick={handleClik3} class="bg-spotify-black text-white p-2 rounded-lg mx-2">1 year</button>
                <button id="button4" onClick={handleClik4} class="bg-spotify-black text-white p-2 rounded-lg mx-2">All time</button>
            </div>
            <Routes>
                <Route path="/" element={<TabelLagu data={currentSongs} num={firstIndex}/>} />
                <Route path="/artis" element={<TabelArtis />} />
            </Routes>
            <Pagination onChangePage = {changePage} onchangeBgPage = {changeBgPage}/>
        </Router>
        </>
    );
}

export default Change_Time;