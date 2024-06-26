import React from "react";
import "../tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TabelLagu from "./tabelLagu.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabelArtis from "./tabelArtis.jsx";
import Pagination from "./pagination.jsx";

const Change_Time = () => {
    let [onemonthsong, setonemonthsong] = useState([])
    let [sixmonthsong, setsixmonthsong] = useState([])
    let [oneyearsong, setoneyearsong] = useState([])
    let [allyearsong, setallyearsong] = useState([])    
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);
    const firstIndex = currentPage * songsPerPage - songsPerPage;
    const lastIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(firstIndex, lastIndex);

    // Ganti halaman
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    // Animasi tabel
    const tableAnimation = () => {
        const table = document.getElementById("tabelmusik");
        document.getElementById("tabelmusik").classList.remove("fade-in");
        void table.offsetWidth;
        document.getElementById("tabelmusik").classList.add("fade-in");
    }

    // Ganti warna background button
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
        tableAnimation();
    }

    // Ganti warna background button
    useEffect(() => {
        const page1 = document.getElementById("buttonpage1")
        page1.classList.remove("bg-spotify-black")
        page1.classList.add("bg-spotify-green")
    }, []);

    // Mengambil data lagu
    useEffect(() => {
        const fetch1month = async () => {
          let result = await axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth")
          console.log(result.data)
          setSongs(result.data)
          setonemonthsong(result.data)
        }
        fetch1month()
        }, []);

    useEffect(() => {
        const all_data = async () => {
            let result2 = await axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth")
            setsixmonthsong(result2.data)
            let result3 = await axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear")
            setoneyearsong(result3.data)
            let result4 = await axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime")
            setallyearsong(result4.data)
        }
        all_data()
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
    
    const handleClik = () => {
        let result = onemonthsong
        add_bgreen("button1")
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik2 = async () => {
        let result = sixmonthsong
        add_bgreen("button2")
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik3 = async () => {
        let result = oneyearsong
        add_bgreen("button3")
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik4 = async () => {
        let result = allyearsong
        add_bgreen("button4")
        setSongs(result)
        tableAnimation();
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