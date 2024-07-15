import Title from './frontend/header.jsx';
import './App.css';
import React, { useEffect, useState } from "react";
import Carousel from './frontend/carousel.jsx'
import "./tailwind.css";
import Change_Time from './frontend/button.jsx';
import Footer from './frontend/footer.jsx';
import InfoLengkap from './frontend/infoLengkap.jsx';


function App() {
  const [tenFirstSongs, setTenFirstSongs] = useState([])

  useEffect(() => {
    console.log(tenFirstSongs)
  }, [tenFirstSongs])

  const changeTenFirstSongs = (data) => {
    setTenFirstSongs(data)
  }

  const [songClicked, setSongClicked] = useState()
  const [songData, setSongData] = useState()

  const handleSongData = (data) => {
    console.log("Ini data", data)
    setSongData(data)
  }

  const handleSongClickedtrue = (data) => {
    handleSongData(data)
  }
  
  const handleSongClickedfalse = () => {
    // document.getElementById("infoWrapper").classList.remove("out")
    const infoElement = document.getElementById("info");
    if (infoElement) {
      infoElement.classList.remove("in");
      infoElement.classList.add("out");
      setTimeout(() => {
        setSongClicked(false);
        setSongData(undefined);
      }, 500); // Durasi animasi
    }
  }

  useEffect(() => {
    if (songData !== undefined) {
      setSongClicked(true);
      console.log("Song Clicked", songData);
    }
  }, [songData]);

  useEffect(() => {
    const infoElement = document.getElementById("info");
    console.log(infoElement);
    if (infoElement) {
      infoElement.classList.remove("out");
      infoElement.classList.add("in");
    }
  }, [songClicked])

  // useEffect (() => {
  //   let titleMini = document.getElementById("miniTitle")
  //   titleMini.classList.add("slideToRight")
  // }, [])

  return (
    <div className="App bg-primary min-h-screen w-screen flex relative flex-col">
      <Title />
      <p id="miniTitle"  className='text-light-second font-bold text-xl font-Oswald'>Top 10 Haikal's songs (1 Month)</p>
      <Carousel datas={tenFirstSongs}/>
      <Change_Time onChangeTenFirstSongs={changeTenFirstSongs} clickSong={handleSongClickedtrue}/>
      {songClicked ? <InfoLengkap clickCross = {handleSongClickedfalse} data={songData}/> : null}
    </div>  
  );
}


export default App;
