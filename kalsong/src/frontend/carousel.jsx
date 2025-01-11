import React, { useEffect } from "react";
import "../tailwind.css"
import "../App.css"
import { use } from "react";

const Carousel = ({datas}) => {
    console.log(datas)
    const [slideIndex, setSlideIndex] = React.useState(0)
    const [isStart, setIsStart] = React.useState(false)
    const [isAnimating, setIsAnimating] = React.useState(false)

    const handleDotClick = (index) => {
        if (isAnimating) return;
        
        const songs = document.querySelectorAll("#singleItem");
        const dots = document.querySelectorAll("#dot")
        if (songs.length === 0) return;
        if (dots.length === 0) return;

        setIsAnimating(true);
        songs[slideIndex].style.animation = "fadeOutCarousel 0.5s ease-in-out forwards";
        songs[index].style.animation = "fadeInCarousel 1s ease-in-out forwards";
        changeDotsColor(slideIndex, index)
        setSlideIndex(index);

        setTimeout(() => {
            setIsAnimating(false);
        }, 1000);
    }   

    useEffect(() => {
        console.log("useEffect")
        const songs = document.querySelector("#singleItem");
        const dot = document.querySelector("#dot")
        if (songs === null) return;
        if (isStart === false) {
            setIsAnimating(true);
            songs.style.animation = "fadeInCarousel 1s ease-in-out forwards";
            if (dot) {
                dot.classList.remove("bg-white")
                dot.classList.add("bg-second-two")
            }
            setIsStart(true);
            setTimeout(() => {
                setIsAnimating(false);
            }, 1000);
        }
    },[])

    useEffect(() => {
        const songs = document.querySelectorAll("#singleItem");
        if (songs.length === 0) {
            console.log("Tidak ada")
            return;
        } 
    
        const interval = setInterval(() => {
            if (isAnimating) return;

            let current = slideIndex;
            let next = (current + 1) % songs.length;

            if (songs.length === 0) return;

            // Do animations
            setIsAnimating(true);
            const button = document.getElementsByTagName("button");
            Array.from(button).forEach((element) => {
                //Disable button
                element.disabled = true
            })
            songs[current].style.animation = "fadeOutCarousel 0.5s ease-in-out forwards";
            songs[next].style.animation = "fadeInCarousel 0.8s ease-in-out forwards";
            
            // Change dots
            changeDotsColor(current, next);

            // Set timeout
            setTimeout(() => {
                setIsAnimating(false);
                Array.from(button).forEach((element) => {
                    //Disable button
                    element.disabled = false
                })
        }, 400);

        // Finally set the new index
        setSlideIndex(next);
        }, 5000);
    
        return () => {
            clearInterval(interval);
        }
    }, [slideIndex, datas, isAnimating])

    useEffect(() => {
        console.log("useEffect datas")
        const songs = document.querySelectorAll("#singleItem");
        if (songs.length === 0) return;
        setIsAnimating(true);
        songs[slideIndex].style.animation = "fadeOutCarousel 0s ease-in-out forwards";
        setTimeout(() => {
            songs[slideIndex].style.animation = "fadeInCarousel 1s ease-in-out forwards";
        }, 100);
        setIsAnimating(false);
    }, [datas])
    
    const changeDotsColor = (current, next) => {
        const dots = document.querySelectorAll("#dot")
        if (dots.length === 0) return;
        dots[current].classList.remove("bg-second-two")
        dots[current].classList.add("bg-white")
        dots[next].classList.remove("bg-white")
        dots[next].classList.add("bg-second-two")
    }

    return (
        <div id="carousel" className="mx-auto mt-2 h-40 lg:min-h-56 lg:h-56 w-full relative">
            <div id="showSlide" className="w-36 lg:w-56 h-36 lg:h-56 mx-auto overflow-hidden relative">
                {datas.map((data, index) => (
                    <div 
                        key={index}
                        id="singleItem" 
                        className={`w-36 lg:w-56 absolute border-2 border-light-second object-fit ${index === 0 ? "active" : ""}`}
                        style={{ 
                            opacity: index === 0 ? 1 : 0,
                            transform: 'scale(1)',
                            left: '0'
                        }}
                    >
                        <img src={data.track.album.images[0].url} alt="" loading="lazy" className="w-full min-w-full" />
                        <div id="songInfo" className="absolute w-full h-full bg-gradient-to-b bottom-0 font-Oswald">
                            <div id="rank" className="absolute text-xl lg:text-4xl text-light-second top-1 left-1 font-bold">{index + 1}</div>
                            <div id="judulLagu" className="absolute text-md lg:text-xl text-light-second bottom-8 left-1 font-bold leading-none text-left">{data.track.name.split(/ [-/()]/)[0]}</div>
                            <div id="penyanyi" className="absolute text-sm lg:text-md text-light-second bottom-2 left-1 opacity-1">{data.track.artists[0].name === "GAC (Gamaliél Audrey Cantika)" ? "GAC" : data.track.artists[0].name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div id="dots" className="flex justify-center mt-3">
                {datas.map((_, index) => (
                    <p 
                        key={index}
                        id="dot" 
                        className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 
                            ${index === slideIndex ? 'bg-second-two' : 'bg-white'}
                            ${isAnimating ? 'pointer-events-none' : 'cursor-pointer'}`}
                        onClick={() => handleDotClick(index)}
                    ></p>
                ))}
            </div>
        </div>
    )
}

export default Carousel; 