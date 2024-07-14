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

  const [songClicked, setSongClicked] = useState(false)

  const handleSongClickedtrue = () => {
    setSongClicked(true)
    console.log("Song Clicked")
  }
  
  const handleSongClickedfalse = () => {
    setSongClicked(false)
  }

  // useEffect (() => {
  //   let titleMini = document.getElementById("miniTitle")
  //   titleMini.classList.add("slideToRight")
  // }, [])

  return (
    <div className="App bg-primary min-h-screen w-screen flex flex-col">
      <Title />
      <p id="miniTitle" className='text-light-second font-bold text-xl font-Oswald'>Top 10 Haikal's songs (1 Month)</p>
      <Carousel datas={tenFirstSongs} clickSong={handleSongClickedtrue}/>
      <Change_Time onChangeTenFirstSongs={changeTenFirstSongs}/>
      {songClicked ? <InfoLengkap clickCross = {handleSongClickedfalse}/> : null}
    </div>  
  );
}


export default App;
