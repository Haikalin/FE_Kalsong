import Title from './frontend/header.jsx';
import './App.css';
import React, { useEffect, useState } from "react";
import Carousel from './frontend/carousel.jsx'
import "./tailwind.css";
import Change_Time from './frontend/button.jsx';
import Footer from './frontend/footer.jsx';
// import getBearer from './backend/fetch.js';


function App() {
  const [tenFirstSongs, setTenFirstSongs] = useState([])

  useEffect(() => {
    console.log(tenFirstSongs)
  }, [tenFirstSongs])

  const changeTenFirstSongs = (data) => {
    setTenFirstSongs(data)
  }

  // useEffect (() => {
  //   let titleMini = document.getElementById("miniTitle")
  //   titleMini.classList.add("slideToRight")
  // }, [])

  return (
    <div className="App bg-primary min-h-screen w-screen flex flex-col">
      <Title />
      <p id="miniTitle" className='text-light-second font-bold text-xl font-Oswald'>Top 10 Haikal's songs (1 Month)</p>
      <Carousel datas={tenFirstSongs}/>
      <Change_Time onChangeTenFirstSongs={changeTenFirstSongs}/>
      {/* <Footer/> */}
    </div>  
  );
}


export default App;
