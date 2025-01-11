import React from "react";
import "../tailwind.css";
import { useState, useEffect } from "react";
import axios from "axios";
import TabelLagu from "./tabelLagu.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TabelArtis from "./tabelArtis.jsx";
import Pagination from "./pagination.jsx";

const ChangeTime = ({ onChangeTenFirstSongs, clickSong }) => {
    const [activePeriod, setActivePeriod] = useState('1month');
    
    // Initialize states from localStorage
    const [onemonthsong, setonemonthsong] = useState(() => {
        const onemonth = localStorage.getItem('onemonthsong')
        return onemonth ? JSON.parse(onemonth) : []
    });

    const [sixmonthsong, setsixmonthsong] = useState(() => {
        const sixmonth = localStorage.getItem('sixmonthsong')
        return sixmonth ? JSON.parse(sixmonth) : []
    });

    const [oneyearsong, setoneyearsong] = useState(() => {
        const oneyear = localStorage.getItem('oneyearsong')
        return oneyear ? JSON.parse(oneyear) : []
    });

    const [allyearsong, setallyearsong] = useState(() => {
        const alltime = localStorage.getItem('allyearsong')
        return alltime ? JSON.parse(alltime) : []
    });

    const [songs, setSongs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [songsPerPage] = useState(10);
    const firstIndex = currentPage * songsPerPage - songsPerPage;
    const lastIndex = currentPage * songsPerPage;
    const currentSongs = songs.slice(firstIndex, lastIndex);

    // Change page with animation
    const changePage = (pageNumber) => {
        setTimeout(() => {
            setCurrentPage(pageNumber)
        }, 500)
        containerAnimation();
    }

    let miniTitle = document.getElementById("miniTitle");

    // Table animation
    const containerAnimation = () => {
        const tombol = document.querySelectorAll("button")
        const table = document.getElementById("containerSong");
        tombol.forEach((button) => {
            button.disabled = true;
        })
        table.classList.remove("fade-in");
        void table.offsetWidth;
        table.classList.add("fade-out");
        setTimeout(() => {
            table.classList.remove("fade-out");
            void table.offsetWidth
            table.classList.add("fade-in");
            tombol.forEach((button) => {
                button.disabled = false;
            })
        }, 1000)
    }

    // Change background color for pagination

    // Add ripple effect and handle time period click
    const handleTimeClick = async (e, period, handler) => {
        setActivePeriod(period);
        
        // Add ripple effect
        const button = e.currentTarget;
        if (button) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            ripple.className = 'absolute rounded-full bg-white opacity-30 animate-ripple';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        }

        handler();
    };

    // Initial setup
    useEffect(() => {
        const page1 = document.getElementById("buttonpage1")
        if (page1) {
            page1.classList.remove("bg-second-two")
            page1.classList.add("bg-second-one")
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('onemonthsong', JSON.stringify(onemonthsong));
        localStorage.setItem('sixmonthsong', JSON.stringify(sixmonthsong));
        localStorage.setItem('oneyearsong', JSON.stringify(oneyearsong));
        localStorage.setItem('allyearsong', JSON.stringify(allyearsong));
    }, [onemonthsong, sixmonthsong, oneyearsong, allyearsong]);

    // Fetch initial data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [oneMonthResponse, sixMonthResponse, oneYearResponse, allTimeResponse] = await Promise.all([
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear"),
                    axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime")
                ]);

                setonemonthsong(oneMonthResponse.data);
                setsixmonthsong(sixMonthResponse.data);
                setoneyearsong(oneYearResponse.data);
                setallyearsong(allTimeResponse.data);
                setSongs(oneMonthResponse.data);
                onChangeTenFirstSongs(oneMonthResponse.data.slice(0, 10))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    // Time period handlers
    const handleClik = async () => {
        let result = onemonthsong;
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(sixmonthsong) || 
            JSON.stringify(result) === JSON.stringify(oneyearsong) || 
            JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/onemonth");
            result = response.data;
            setonemonthsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0, 10))
        miniTitle.innerHTML = "Top 10 Haikal's songs (1 Month)";
    };

    const handleClik2 = async () => {
        let result = sixmonthsong;
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || 
            JSON.stringify(result) === JSON.stringify(oneyearsong) || 
            JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/sixmonth");
            result = response.data;
            setsixmonthsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0, 10))
        miniTitle.innerHTML = "Top 10 Haikal's songs (6 Months)";
    };

    const handleClik3 = async () => {
        let result = oneyearsong;
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || 
            JSON.stringify(result) === JSON.stringify(sixmonthsong) || 
            JSON.stringify(result) === JSON.stringify(allyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/oneyear");
            result = response.data;
            setoneyearsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0, 10))
        miniTitle.innerHTML = "Top 10 Haikal's songs (1 Year)";
    };

    const handleClik4 = async () => {
        let result = allyearsong;
        if (result.length === 0 || JSON.stringify(result) === JSON.stringify(onemonthsong) || 
            JSON.stringify(result) === JSON.stringify(sixmonthsong) || 
            JSON.stringify(result) === JSON.stringify(oneyearsong)) {
            const response = await axios.get("https://apikalsong-haikalins-projects.vercel.app/alltime");
            result = response.data;
            setallyearsong(result);
        }
        containerAnimation();
        setTimeout(() => {
            setSongs(result);
        }, 500)
        onChangeTenFirstSongs(result.slice(0, 10))
        miniTitle.innerHTML = "Top 10 Haikal's songs (All Time)";
    };

    return (
        <Router>
            <div id="kumpulan_button" className="flex justify-center mt-16 gap-2 transition-transform duration-300 ease-in-out">
                <button 
                    id="button1" 
                    onClick={(e) => handleTimeClick(e, '1month', handleClik)}
                    className={`h-8 lg:h-10 text-xs lg:text-base px-4 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg hover:-translate-y-0.5
                        active:shadow-inner active:translate-y-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                        text-white relative overflow-hidden
                        ${activePeriod === '1month' ? 'bg-green-700 scale-105' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    <span className="relative z-10">1 month</span>
                </button>

                <button 
                    id="button2" 
                    onClick={(e) => handleTimeClick(e, '6months', handleClik2)}
                    className={`h-8 lg:h-10 text-xs lg:text-base px-4 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg hover:-translate-y-0.5
                        active:shadow-inner active:translate-y-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                        text-white relative overflow-hidden
                        ${activePeriod === '6months' ? 'bg-green-700 scale-105' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    <span className="relative z-10">6 months</span>
                </button>

                <button 
                    id="button3" 
                    onClick={(e) => handleTimeClick(e, '1year', handleClik3)}
                    className={`h-8 lg:h-10 text-xs lg:text-base px-4 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg hover:-translate-y-0.5
                        active:shadow-inner active:translate-y-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                        text-white relative overflow-hidden
                        ${activePeriod === '1year' ? 'bg-green-700 scale-105' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    <span className="relative z-10">1 year</span>
                </button>

                <button 
                    id="button4" 
                    onClick={(e) => handleTimeClick(e, 'alltime', handleClik4)}
                    className={`h-8 lg:h-10 text-xs lg:text-base px-4 rounded-lg
                        transition-all duration-300 ease-in-out
                        hover:shadow-lg hover:-translate-y-0.5
                        active:shadow-inner active:translate-y-0
                        disabled:opacity-50 disabled:cursor-not-allowed
                        focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                        text-white relative overflow-hidden
                        ${activePeriod === 'alltime' ? 'bg-green-700 scale-105' : 'bg-gray-700 hover:bg-gray-600'}`}
                >
                    <span className="relative z-10">All time</span>
                </button>
            </div>

            <style jsx>{`
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 0.5;
                    }
                    100% {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
                .animate-ripple {
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                }
                button {
                    overflow: hidden;
                    position: relative;
                }
            `}</style>

            <Routes>
                <Route path="/" element={<TabelLagu data={currentSongs} num={firstIndex} clickSong={clickSong} />} />
                <Route path="/artis" element={<TabelArtis />} />
            </Routes>
            <Pagination onChangePage={changePage}/>
        </Router>
    );
};

export default ChangeTime;