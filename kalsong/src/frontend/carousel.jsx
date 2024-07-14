import React, { useEffect } from "react";
import "../tailwind.css"
import "../App.css"

const Carousel = ({datas}) => {

    const [slideIndex, setSlideIndex] = React.useState(0)
    const [isStart, setIsStart] = React.useState(false)

    const handleDotClick = (index) => {
        const songs = document.querySelectorAll("#singleItem");
        const dots = document.querySelectorAll("#dots")
        if (songs.length === 0) return;
        if (dots.length === 0) return;
        songs[slideIndex].style.animation = "slideToLeft 1s ease-in-out forwards";
        songs[index].style.animation = "slideToRight 1s ease-in-out forwards";
        changeDotsColor(slideIndex, index)
        setSlideIndex(index);
    }   

    // Slide index menjadi dependensi agar ketika titik ditekan, reset menjadi 3 detik lagi
    useEffect(() => {
        const songs = document.querySelector("#singleItem");
        const dot = document.querySelector("#dot")
        if (songs === null) return;
        if (isStart === false) {
            songs.style.animation = "slideToRight 1s ease-in-out forwards";
            dot.classList.remove("bg-white")
            dot.classList.add("bg-second-two")
            setIsStart(true);
        }
    },[slideIndex, datas])

    useEffect(() => {
        const songs = document.querySelectorAll("#singleItem");
        if (songs.length === 0) return;
    
        const interval = setInterval(() => {
            setSlideIndex((prev) => {
                let current = prev;
                let next = (prev + 1) % songs.length;

                // Cek panjang data
                if (songs.length === 0) return;

                // Add animation
                songs[current].style.animation = "slideToLeft 1s ease-in-out forwards";
                songs[next].style.animation = "slideToRight 1s ease-in-out forwards";
                changeDotsColor(current,next)
                console.log(next)
                // return next index
                return next;
            });
        },3000);
    
        return () => {
            clearInterval(interval);
    }}, [slideIndex, datas])
    
    const changeDotsColor = (current, next) => {
        const dots = document.querySelectorAll("#dot")
        console.log("current", current, "next", next)
        if (dots.length === 0) return
        dots[current].classList.remove("bg-second-two")
        dots[current].classList.add("bg-white")
        dots[next].classList.remove("bg-white")
        dots[next].classList.add("bg-second-two")
    }

    return (
        <div id="carousel" className="mx-auto mt-2 h-40 lg:min-h-56 lg:h-56 w-full relative">
            <div id="showSlide" className="w-36 lg:w-56 h-36 lg:h-56 mx-auto overflow-hidden relative">
                {datas.map((data, index) => {
                    return(
                        <div id="singleItem" class="container" className={`w-32 lg:w-52 lg:min-w-52 absolute border-2 border-light-second object-fit ${index === 0 ? "active" : "" }`} >
                            <img src={data.track.album.images[0].url} alt="" loading="lazy" className="w-full min-w-full" />
                            <div id="songInfo" className="absolute w-full h-full bg-gradient-to-b bottom-0 font-Oswald">
                                <div id="rank" className="absolute text-xl lg:text-4xl text-light-second top-1 left-1 font-bold">{index + 1}</div>
                                <div id="judulLagu" className="absolute text-md lg:text-xl text-light-second bottom-8 left-1 font-bold leading-none text-left">{data.track.name.split(/ [-/()]/)[0]}</div>
                                <div id="penyanyi" className="absolute text-sm lg:text-md text-light-second bottom-2 left-1 opacity-1">{data.track.artists[0].name === "GAC (Gamaliél Audrey Cantika)" ? "GAC" : data.track.artists[0].name}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div id="dots" className="flex justify-center mt-3">
                {datas.map((data, index)=> {
                    return(
                        <p id="dot" className="w-2 h-2 bg-white mx-1 rounded-full" onClick={() => handleDotClick(index)}></p>
                    )
                })}
            </div>
        </div>
    )
}

export default Carousel