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
        const table = document.getElementById("isitabel");
        document.getElementById("isitabel").classList.remove("fade-in");
        void table.offsetWidth;
        document.getElementById("isitabel").classList.add("fade-in");
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
                button.classList.remove("bg-second-two")
                button.classList.add("bg-second-one")
            }
            else {
                button.classList.remove("bg-second-one")
                button.classList.add("bg-second-two")
            }
        })
        tableAnimation();
    }

    // Ganti warna background button
    useEffect(() => {
        const page1 = document.getElementById("buttonpage1")
        page1.classList.remove("bg-second-two")
        page1.classList.add("bg-second-one")
    }, []);

    // Mengambil data lagu
    useEffect(() => {
        const all_data = () => {
            let result = axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth")
            let result2 = axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth")
            // setsixmonthsong(result2.data)
            let result3 = axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear")
            // setoneyearsong(result3.data)
            let result4 = axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime")
            // setallyearsong(result4.data)
            Promise.all([result, result2, result3, result4]).then((values) => {
                setonemonthsong(values[0].data)
                setsixmonthsong(values[1].data)
                setoneyearsong(values[2].data)
                setallyearsong(values[3].data)
                setSongs(values[0].data)
            })
        }
        all_data()
    }, []);
    
    useEffect(() => {
        const one_month = document.getElementById("button1")
        one_month.classList.remove("bgblack")
        one_month.classList.add("bggreen")
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
                element.classList.remove("bgblack")
                element.classList.add("bggreen")
            }
            else {
                element.classList.remove("bggreen")
                element.classList.add("bgblack")
            }
        })
    }
    
    const handleClik = async () => {
        let result = onemonthsong
        add_bgreen("button1")
        if (result.length === 0  || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong )|| JSON.stringify(result) === JSON.stringify(allyearsong)) {
            result = await axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth")
            result = result.data
            setonemonthsong(result)
        }
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik2 = async () => {
        let result = sixmonthsong
        setSongs(result)
        add_bgreen("button2")
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong )|| JSON.stringify(result) === JSON.stringify(allyearsong)) {
            console.log("Ya, sama")
            result = await axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth")
            result = result.data
            setsixmonthsong(result)
        }
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik3 = async () => {
        let result = oneyearsong
        add_bgreen("button3")
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) ===JSON.stringify(allyearsong)) {
            result = await axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear")
            result = result.data
            setoneyearsong(result)
        }
        setSongs(result)
        tableAnimation();
    }
    
    const handleClik4 = async () => {
        let result = allyearsong
        add_bgreen("button4")
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) ===JSON.stringify (oneyearsong)) {
            result = await axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime")
            result = result.data
            setallyearsong(result)
        }
        setSongs(result)
        tableAnimation();
    }
    return (
        <>
        <Router>
            <div id="kumpulan_button" className="flex justify-center mt-5">
                <button id="button1" onClick={handleClik} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-white p-2 rounded-lg mx-2 ">1 month</button>
                <button id="button2" onClick={handleClik2} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-white p-2 rounded-lg mx-2">6 months</button>
                <button id="button3" onClick={handleClik3} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-white p-2 rounded-lg mx-2">1 year</button>
                <button id="button4" onClick={handleClik4} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-white p-2 rounded-lg mx-2">All time</button>
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