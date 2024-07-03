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

    useEffect(() => {
        localStorage.setItem('onemonthsong', JSON.stringify(onemonthsong));
        localStorage.setItem('sixmonthsong', JSON.stringify(sixmonthsong));
        localStorage.setItem('oneyearsong', JSON.stringify(oneyearsong));
        localStorage.setItem('allyearsong', JSON.stringify(allyearsong));
    }, [onemonthsong, sixmonthsong, oneyearsong, allyearsong]);

    // Memulihkan state dari localStorage saat komponen dimuat
    useEffect(() => {
        const storedOneMonthSong = localStorage.getItem('onemonthsong');
        const storedSixMonthSong = localStorage.getItem('sixmonthsong');
        const storedOneYearSong = localStorage.getItem('oneyearsong');
        const storedAllYearSong = localStorage.getItem('allyearsong');

        if (storedOneMonthSong) setonemonthsong(JSON.parse(storedOneMonthSong));
        if (storedSixMonthSong) setsixmonthsong(JSON.parse(storedSixMonthSong));
        if (storedOneYearSong) setoneyearsong(JSON.parse(storedOneYearSong));
        if (storedAllYearSong) setallyearsong(JSON.parse(storedAllYearSong));
    }, []);

    // Mengambil data lagu
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [result1, result2, result3, result4] = await Promise.all([
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime"),
                ]);

                setonemonthsong(result1.data);
                setsixmonthsong(result2.data);
                setoneyearsong(result3.data);
                setallyearsong(result4.data);
                setSongs(result1.data); // Default to 1 month data
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        document.getElementById("button1").classList.remove("bg-second-two");
        document.getElementById("button1").classList.add("bg-second-one");
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
        let result = onemonthsong;
        console.log("One month:",result[2].track.name)
        add_bgreen("button1");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth");
            result = response.data;
            setonemonthsong(result);
        }
        setSongs(result);
        tableAnimation();
    };
    
    const handleClik2 = async () => {
        let result = sixmonthsong;
        console.log("Six month:",result[2].track.name)
        add_bgreen("button2");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth");
            result = response.data;
            setsixmonthsong(result);
        }
        setSongs(result);
        tableAnimation();
    };
    
    const handleClik3 = async () => {
        let result = oneyearsong;
        console.log("One year:",result[2].track.name)
        add_bgreen("button3");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear");
            result = response.data;
            setoneyearsong(result);
        }
        setSongs(result);
        tableAnimation();
    };
    
    const handleClik4 = async () => {
        let result = allyearsong;
        console.log("All year:",result[2].track.name)
        add_bgreen("button4");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime");
            result = response.data;
            setallyearsong(result);
        }
        setSongs(result);
        tableAnimation();
    };
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