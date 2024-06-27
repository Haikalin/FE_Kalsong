import Title from './frontend/header.jsx';
import './App.css';
import React from "react";
import "./tailwind.css";
import Change_Time from './frontend/button.jsx';
import Footer from './frontend/footer.jsx';
// import getBearer from './backend/fetch.js';


function App() {


  return (
    <div className="App bg-gray-800 min-h-screen flex flex-col">
      <Title />
      <div className='mb-auto'>
      <p>Listen to Haikal's favorite songs on Spotify</p>
      <Change_Time/>
      </div>
      <Footer/>
    </div>  
  );
}


export default App;
