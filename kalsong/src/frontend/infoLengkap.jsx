import React from "react";
import "../App.css"
import spotifyImage from "../image/5ece500f123d6d0004ce5f8a.png"
import cross from "../image/—Pngtree—vector cross icon_4184842.png"

const InfoLengkap = ({clickCross, data }) => {
    function millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    return (
        <div id="infoWrapper" className="w-full h-full lg:w-full lg:h-full flex opacity-100 z-10 justify-center items-center bg-black bg-opacity-50 absolute color-white">
            <div id="info" className="w-4/5 lg:w-2/3 h-100 bg-light-second z-20 rounded-lg "> {console.log(data)}
                <div id="containerPict" className="flex items-center justify-center">
                    <img id="pict" src={data.track.album.images[0].url} className="opacity-100 w-32 md:w-48 rounded-lg border-solid border-2 border-primary"></img>
                </div>
                <div id="dataLagu" className="text-black text-sm md:text-base flex flex-col flex-wrap font-Oswald font-bold">
                    <div id="namaAlbum" className="text-black basis-1/3 w-1/2 flex flex-wrap justify-center  items-center overflow-hidden text-clip align-middle">Album: <br />{data.track.album.name === "Sambil Menggandeng Erat Tanganku (Te Wo Tsunaginagara)" ? "Sambil Menggandeng Erat Tanganku" : data.track.album.name}</div>
                    <div id="judulLagu" className="basis-1/3 w-1/2 flex flex-wrap justify-center items-center">Judul: <br />{data.track.name}</div>
                    <div id="namaArtis" className="basis-1/3 w-1/2 flex flex-wrap justify-center items-center">Artis: <br />{data.track.artists[0].name}</div>
                    <div id="releaseDate" className="basis-1/3 w-1/2 flex flex-wrap justify-center items-center">Tanggal Rilis: <br />{data.track.album.release_date}</div>
                    <div id="duration" className="basis-1/3 w-1/2 flex flex-wrap justify-center items-center">Durasi: <br />{millisToMinutesAndSeconds(data.track.duration_ms)}</div>
                    <a id="spotifyPict" href={data.track.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="basis-1/3 w-1/2 flex justify-center items-center font-Oswald font-bold">
                        <img src={spotifyImage} className="w-32" alt="" />
                    </a>
                </div>
                <div id="cross" className="flex justify-end w-full">
                    <img src={cross} onClick={clickCross} alt="" className="w-8 hover:scale-110"/>
                </div> 
            </div>
        </div>
    )
}

export default InfoLengkap;