import React from "react";

const InfoLengkap = ({clickCross, data }) => {
    return (
        <div id="infoWrapper" className="lg:w-full lg:h-full flex opacity-100 z-10 justify-center items-center bg-transparent absolute color-white">
            <div id="info" className="lg:w-2/3 h-100 bg-black z-20 bg-opacity-70 rounded-lg "> {console.log(data)}
                <img id="pict" src={data.track.album.images[0].url} className="opacity-100"></img>
            </div>
        </div>
    )
}

export default InfoLengkap;