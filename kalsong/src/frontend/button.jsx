import React from "react";
import "../tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TabelLagu from "./tabelLagu.jsx";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TabelArtis from "./tabelArtis.jsx";
import Pagination from "./pagination.jsx";

const Change_Time = ({onChangeTenFirstSongs, clickSong}) => {
    let [onemonthsong, setonemonthsong] = useState(() => {
        const onemonth =  localStorage.getItem('onemonthsong')
        if (onemonth) {

            return JSON.parse(onemonth)
        }
        else {
            return []
        }
    })
    let [sixmonthsong, setsixmonthsong] = useState(() => {
        const sixmonth =  localStorage.getItem('sixmonthsong')
        if (sixmonth) {
            return JSON.parse(sixmonth)
        }
        else {
            return []
        }
    })
    let [oneyearsong, setoneyearsong] = useState(() => {
        const oneyear =  localStorage.getItem('oneyearsong')
        if (oneyear) {
            return JSON.parse(oneyear)
        }
        else {
            return []
        }
    })
    let [allyearsong, setallyearsong] = useState(() => {
        const alltime =  localStorage.getItem('allyearsong')
        if (alltime) {
            return JSON.parse(alltime)
        }
        else {
            return []
        }
    })    
    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);
    const firstIndex = currentPage * songsPerPage - songsPerPage;
    const lastIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(firstIndex, lastIndex);

    // Ganti halaman
    const changePage = (pageNumber) => {
        setTimeout(() => {
            setCurrentPage(pageNumber)
        }, 500)
    }

    let miniTitle = document.getElementById("miniTitle");

    // Animasi tabel
    const containerAnimation = () => {
        const tombol = document.querySelectorAll("button")
        const table = document.getElementById("containerSong");
        tombol.forEach((button) => {
            button.disabled = true;
        })
        table.classList.remove("fade-out");
        void table.offsetWidth;
        table.classList.add("fade-out");
        setTimeout(() => {
            table.classList.remove("fade-out");
            void table.offsetWidth
            table.classList.remove("fade-in");
            void table.offsetWidth;
            table.classList.add("fade-in");
            tombol.forEach((button) => {
                button.disabled = false;
            })
        }, 1000)
    }

    const listAnimation = () => {
        const list = document.getElementById("carousel");
        document.getElementById("carousel").classList.remove("fade-in-2");
        void list.offsetWidth;
        document.getElementById("carousel").classList.add("fade-in-2");
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
        containerAnimation();
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

    // Mengambil data lagu
    useEffect(() => {
        const fetchData = async () => {
            const maxret = 10;
            let onemonth = axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth");
            let sixmonth = axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth");
            let oneyear = axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear");
            let alltime = axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime");

            let [oneMonthResponse, sixMonthResponse, oneYearResponse, allTimeResponse] = await Promise.all([onemonth, sixmonth, oneyear, alltime]);

            setonemonthsong(oneMonthResponse.data);
            setsixmonthsong(sixMonthResponse.data);
            setoneyearsong(oneYearResponse.data);
            setallyearsong(allTimeResponse.data);
            setSongs(oneMonthResponse.data);
            onChangeTenFirstSongs(oneMonthResponse.data.slice(0,10))
        };

        fetchData();
    }, []);
    
    useEffect(() => {
        document.getElementById("button1").classList.remove("bg-second-two");
        document.getElementById("button1").classList.add("bg-second-one");
        document.getElementById("button1").classList.remove("text-black");
        document.getElementById("button1").classList.add("text-white");
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
                element.classList.remove("text-black")
                element.classList.add("text-white")
            }
            else {
                element.classList.remove("bggreen")
                element.classList.add("bgblack")
                element.classList.remove("text-white")
                element.classList.add("text-black")
            }
        })
    }
    
    const handleClik = async () => {
        let result = onemonthsong;
        add_bgreen("button1");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth");
            result = response.data;
            setonemonthsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0,10))
        listAnimation();
        miniTitle.innerHTML = "Top 10 Haikal's songs (1 Month)";
    };
    
    const handleClik2 = async () => {
        let result = sixmonthsong;
        add_bgreen("button2");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth");
            result = response.data;
            setsixmonthsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0,10))
        listAnimation();
        miniTitle.innerHTML = "Top 10 Haikal's songs (6 Months)";
    };
    
    const handleClik3 = async () => {
        let result = oneyearsong;
        add_bgreen("button3");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear");
            result = response.data;
            setoneyearsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0,10))
        listAnimation();
        miniTitle.innerHTML = "Top 10 Haikal's songs (1 Year)";
    };
    
    const handleClik4 = async () => {
        let result = allyearsong;
        add_bgreen("button4");
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || JSON.stringify(result) === JSON.stringify(sixmonthsong) || JSON.stringify(result) === JSON.stringify(oneyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime");
            result = response.data;
            setallyearsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0,10))
        listAnimation();
        miniTitle.innerHTML = "Top 10 Haikal's songs (All Time)";
    };
    return (
        <>
        <Router>
            <div id="kumpulan_button" className="flex justify-center mt-8">
                <button id="button1" onClick={handleClik} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-black p-2 rounded-lg mx-2 ">1 month</button>
                <button id="button2" onClick={handleClik2} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-black p-2 rounded-lg mx-2">6 months</button>
                <button id="button3" onClick={handleClik3} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-black p-2 rounded-lg mx-2">1 year</button>
                <button id="button4" onClick={handleClik4} class="h-8 lg:h-10 text-xs lg:text-base w-18 lg:w-22 bg-second-two text-black p-2 rounded-lg mx-2">All time</button>
            </div>
            <Routes>
                <Route path="/" element={<TabelLagu data={currentSongs} num={firstIndex} clickSong={clickSong}/>} />
                <Route path="/artis" element={<TabelArtis />} />
            </Routes>
            <Pagination onChangePage = {changePage} onchangeBgPage = {changeBgPage}/>
        </Router>
        </>
    );
}

export default Change_Time;