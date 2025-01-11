import React, { useState } from "react";

const Pagination = ({ onChangePage }) => {
    const [activePage, setActivePage] = useState(1);
    let pages = []
    for (let i = 0; i < 5; i++) {
        pages.push(i)
    }

    const handleClick = (e, page) => {
        const idpage = page + 1;
        setActivePage(idpage);
        
        const button = document.getElementById("buttonpage" + idpage);
        if (button) {
            // Add ripple effect
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
        onChangePage(page + 1);
    };

    return (
        <div className="w-1/2 h-16 mt-1 notphone:mt-0 sm:mt-8 md:mt-0 mx-auto flex justify-center align-middle items-center mb-10 transition-all duration-300 ease-in-out">
            <div className="flex gap-2 transition-transform duration-300 ease-in-out hover:scale-105">
                {pages.map((page) => {
                    const idpage = page + 1;
                    const isActive = activePage === idpage;
                    
                    return (
                        <button
                            key={idpage}
                            id={"buttonpage" + idpage}
                            className={`w-10 h-10 flex justify-center items-center 
                                     rounded-lg 
                                     transition-all duration-300 ease-in-out
                                     hover:shadow-lg hover:-translate-y-0.5
                                     active:shadow-inner active:translate-y-0
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50
                                     text-white
                                     ${isActive 
                                        ? 'bg-green-700 scale-105' 
                                        : 'bg-gray-700 hover:bg-gray-600'}`}
                            onClick={(e) => handleClick(e, page)}
                        >
                            <span className="relative z-10">{page + 1}</span>
                        </button>
                    )
                })}
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
        </div>
    );
}

export default Pagination;